import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { image_upload_url } from "../../../Config/Config";
import { addBooks } from "../AxiosConfig/AxiosConfig";

function BookPublishForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [cloudinaryImage, setCloudinaryImage] = useState("");
  

  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  async function publishNewBook(e) {
    e.preventDefault();
    if (image) {
      const allowedFormats = ["image/jpeg", "image/png"];
      if (!allowedFormats.includes(image.type)) {
        toast.error("Invalid image format. Please select a JPEG or PNG image.");
        return;
      }
    }

   

    await imageHandler();


    if ( cloudinaryImage) {
      const response = await addBooks(
        title,
        summary,
        genre,
        price,
        cloudinaryImage,
        parseData._id,
        parseData.name
      );

      if (response.data.newBook) {
        setRedirect(true);
      }
    }
  }

  const imageHandler = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bookImage");
    formData.append("cloud_name", "dnkc0odiw");
    const response = await axios.post(`${image_upload_url}`, formData);

    setCloudinaryImage(response.data.public_id);
  };

  

  if (redirect) {
    return <Navigate to={"/homePage"} />;
  }

  return (
    <Container style={{ marginTop: "6rem" }}>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Row className="justify-content-center align-items-center ">
        <Col
          md={12}
          className="justify-content-center align-items-center text-center"
        >
          <h1>Add a new book here </h1>
        </Col>
        <Col md={8}>
          <form
            onSubmit={publishNewBook}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
              <input
                type="text"
                className="form-control"
                id="genre"
                placeholder="Enter Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="summary" className="form-label">
              Summary
              </label>
              <ReactQuill
                value={summary}
                onChange={(value) => setSummary(value)}
                placeholder="Write something..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => {
                  const inputElement = e.target;
                  if (inputElement && inputElement.files) {
                    const selectedFile = inputElement.files[0];
                    setImage(selectedFile);
                  }
                }}
              />
              <label>Allowed formats: JPEG/PNG</label>
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Publish
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}



export default BookPublishForm
