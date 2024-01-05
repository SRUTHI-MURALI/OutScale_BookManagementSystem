import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import "./Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { login } from "../Redux/UserSlice";
import { userLogin } from "../AxiosConfig/AxiosConfig";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedEmail = email.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill all fields");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await userLogin(trimmedEmail, trimmedPassword);

      const userData = response.data;

      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(login(userData));
      toast.success("successfully logged in");
      navigate("/homePage");
    } catch (error) {
      // Display the error message from the response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while logging in");
      }
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/homePage");
    }else{
      navigate("/login");

    }
  }, [navigate]);

  return (
    
      <Container className="mt-5 " style={{width:'50rem'}}>
        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
        <Card style={{backgroundColor:" rgb(139, 179, 198)"}}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
          ></ToastContainer>
          <Row className="m-3">
            
            <Col xs={12} md={12}>
              <h1 style={{ textAlign: "center" }} className="mt-5">
                Login Form
              </h1>
              <Form onSubmit={handleSubmit} className="mt-5  " >
                <Form.Group className="mb-3 mt-5" controlId="formGridAddress1">
                  <Form.Label>Registered Email</Form.Label>
                  <Form.Control
                    placeholder="123@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-5" controlId="formGridAddress2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Row>
                  <Col xs={12} md={5}></Col>
                  <Col xs={12} md={4}>
                    <Button variant="primary" type="submit">
                      Login to site
                    </Button>
                  </Col>
                </Row>
              
              </Form>
              <Row>
                <Col>
                 
                </Col>
                <Col>
                  <h6 className="mt-3 ">
                    {" "}
                    If you are a new user?{" "}
                    <Link to="/">Register</Link>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Container>
   
  );
}

export default LoginForm;
