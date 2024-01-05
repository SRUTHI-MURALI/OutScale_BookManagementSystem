import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

import { toast, ToastContainer } from "react-toastify";
import { VerifyOtp } from "../AxiosConfig/AxiosConfig";

function OtpVerificationForm({ email }) {
  const [otp, setOtp] = useState("");

  const [otpSent] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedOtp = otp.trim();
    if (trimmedOtp === "") {
      return;
    }

    try {
      await VerifyOtp(trimmedOtp)
        .then(() => {
          alert("Otp verified successfully");
          navigate("/login");
        })
        .catch((error) => {
          error.response &&
            error.response.data &&
            error.response.data.message &&
            toast.error("otp verification failed");
        });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // You can display an error message to the user or take other actions as needed
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center"
    style={{ height: "100vh" }}>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Card
        style={{ width: "18rem", backgroundColor: " rgb(139, 179, 198)" }}
        className="text-center"
      >
        {otpSent ? (
          <>
            <Form onSubmit={handleSubmit} className="mt-2">
              <Card.Body>
                <Card.Title> Enter Otp Send to the email : {email}</Card.Title>
                <Card.Img variant="top" />
                <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
                  <Form.Control
                    placeholder="Enter otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Verify
                </Button>
              </Card.Body>
            </Form>
          </>
        ) : null}
      </Card>
    </Container>
  );
}

export default OtpVerificationForm;
