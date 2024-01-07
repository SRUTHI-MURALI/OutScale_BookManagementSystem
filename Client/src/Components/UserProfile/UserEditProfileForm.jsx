import React, { useEffect, useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";

import { getUserProfile, userEditProfile } from "../AxiosConfig/AxiosConfig";

function UserEditProfileForm({ user, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  
  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const response = await getUserProfile(id);
        const profile = response.data.userDetails;

        setName(profile?.name || "");
        setEmail(profile?.email || "");
        setPassword(profile?.password || "");
        setGender(profile?.gender || "");
        setPhone(profile?.phone || "");
        setAge(profile?.age || "");
        setCountry(profile?.country || "");
       
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(user._id);
  }, []);

  const handleEditUserProfile = async (e) => {
    e.preventDefault();

    
    const namePattern = /^[A-Za-z\s.]+$/;
    if (name === "") {
      setName("No Name");
    } else {
      if (!namePattern.test(name)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (gender === "") {
      setGender("No Gender");
    } else {
      if (!namePattern.test(gender)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (country === "") {
      setCountry("No Country");
    } else {
      if (!namePattern.test(country)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (age === "") {
      setAge("No Age");
    }
    if (phone === "") {
      setPhone("No number");
    }
    if (email === "") {
      setEmail("No Mail");
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    try {
      await userEditProfile(
        user._id,
        name,
        phone,
        email,
        password,
        gender,

        age,
        country
      );
      toast.success("successfully edited");
      onClose(false);
    } catch (error) {
      return;
    }
  };

  const handleClose = () => {
    toast.success("successfully closed edit page");
    onClose(false);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Container className="m-5">
        <Row className="justify-content-center align-items-center ">
          <Col>
            <Form
              onSubmit={handleEditUserProfile}
              className="regCard"
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Row>
                <Col>
                  <Button
                    variant="none"
                    className="float-end"
                    onClick={handleClose}
                  >
                    <IoMdClose size={25} />
                  </Button>
                </Col>
              </Row>
              <Form.Group as={Row} className="mb-3 mt-3">
                <Form.Label column sm="2">
                  Name:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder={name}
                    value={name}
                    onChange={(e) => {
                      const trimmedName = e.target.value.trim();
                      setName(trimmedName);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Email :
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder={email}
                    value={email}
                    onChange={(e) => {
                      const trimmedEmail = e.target.value.trim();
                      setEmail(trimmedEmail);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Phone
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    placeholder={phone}
                    value={phone}
                    onChange={(e) => {
                      const trimmedPhone = e.target.value.trim();
                      setPhone(trimmedPhone);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Gender
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder={gender}
                    value={gender}
                    onChange={(e) => {
                      const trimmedGender = e.target.value.trim();

                      setGender(trimmedGender);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Age
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    placeholder={age}
                    value={age}
                    onChange={(e) => {
                      const trimmedAge = e.target.value.trim();
                      setAge(trimmedAge);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Country
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder={country}
                    value={country}
                    onChange={(e) => {
                      const trimmedCountry = e.target.value.trim();
                      setCountry(trimmedCountry);
                    }}
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <Button className="float-end" type="submit">
                    Submit Form
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserEditProfileForm;
