import React, { useEffect, useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Image_Url, image_upload_url } from "../../../Config/Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import {
  getUserProfile,
  userEditProfileImage,
} from "../AxiosConfig/AxiosConfig";

function UserEditProfilePictureForm({ user, onClose }) {
  const [image, setImage] = useState(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const response = await getUserProfile(id);
        const profile = response.data.userDetails;

        setExistingImage(profile?.photo || "");
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(user._id);
  }, []);

  const handleEditUserProfile = async (e) => {
    e.preventDefault();

    if (image) {
      await imageHandler();
    } else if (existingImage) {
      setPhoto(existingImage);
    } else {
      setPhoto("No Pic");
    }

    if (photo) {
      try {
        await userEditProfileImage(user._id, photo);
        toast.success("successfully edited");
        onClose(false);
      } catch (error) {
        return;
      }
    }
  };

  const handleClose = () => {
    toast.success("successfully closed edit page");
    onClose(false);
  };

  const imageHandler = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bookImage");
    formData.append("cloud_name", "dnkc0odiw");
    await axios
      .post(`${image_upload_url}`, formData)
      .then((response) => {
        setCloudinaryURL(response.data.public_id);
        setPhoto(cloudinaryURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Container className="m-5 ">
        <Row className="justify-content-center align-items-center ">
          <Col>
            <Form
              onSubmit={handleEditUserProfile}
              className="regCard1"
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

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="m-5"></Form.Label>
                <img
                  style={{ maxWidth: "50%" }}
                  src={`${Image_Url}/${existingImage}`}
                  alt="profile"
                  className="rounded-circle img-fluid"
                />
                <Form.Control
                  className="mt-5"
                  type="file"
                  onChange={(e) => {
                    const inputElement = e.target;
                    if (inputElement && inputElement.files) {
                      const selectedFile = inputElement.files[0];
                      setImage(selectedFile);
                    }
                  }}
                />
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

export default UserEditProfilePictureForm;
