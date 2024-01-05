import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Register.css'
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {SendOtp } from "../AxiosConfig/AxiosConfig";


function RegisterForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = userName.trim();
    const trimmedPassword = password.trim();
    const trimmedPhone = phone 
    const trimmedEmail = email.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (
      trimmedName === "" ||
      trimmedEmail === "" ||
      trimmedPhone === 0 ||
      trimmedPassword === "" ||
      trimmedConfirmPassword === ""
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Validate username format (only letters and spaces allowed)
    const usernamePattern = /^[A-Za-z\s.\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;

    if (!usernamePattern.test(trimmedName.trim())) {
      toast.error("Username can only contain letters,symbols and spaces");
      return;
    }
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(trimmedPhone.toString().trim())) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailP = /^[^\s@]+@gmail\.com$/;
    if (!emailPattern.test(trimmedEmail.trim()) || !emailP.test(trimmedEmail.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {

      toast.error("password mismatch");
      return;
    }else{
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
      if(!regex.test(trimmedPassword)){
        toast.error("Password should be 8 characters and should contain a lowercase letter , a uppercase letter , a number and a symbol ");
        return;
      }
    }

    try {
      await SendOtp(
        trimmedName,
        trimmedEmail,
        trimmedPhone,
        trimmedPassword
      );

      handleNavigation(trimmedEmail);
    } catch (error) {
      toast.error("Registration error");
      return;
    }
  };

  const handleNavigation = (email) => {
    navigate(`/verifyOtp/${email}`);
  };

  return (
    <Container className="mt-5"style={{width:'50rem'}}>
      <Card style={{backgroundColor:" rgb(139, 179, 198)"}}>
        <ToastContainer position="top-center"></ToastContainer>
        <Row className="m-3">
          
          <Col xs={12} md={12}>
            <h1 style={{ textAlign: "center" }} className="mt-5">
              User Register Form
            </h1>
            <Form onSubmit={handleSubmit} className="mt-2 ">
              <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
                <Form.Label>Name of User</Form.Label>
                <Form.Control
                  placeholder="Angelina"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-3" controlId="formGridAddress2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  placeholder="123456789"
                  value={phone}
                  onChange={(e) => setPhone(Number(e.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-center mt-5">
                <Button variant="primary" type="submit">
                  New Register
                </Button>
              </div>
            </Form>
            <h6 className="mt-5" style={{ textAlign: "right" }}>
              Have you already registered? <Link to="/login">Login</Link>
            </h6>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default RegisterForm;
