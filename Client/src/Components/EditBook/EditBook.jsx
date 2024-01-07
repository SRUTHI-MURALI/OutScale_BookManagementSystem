import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {  editBook, getEditBooks,  } from "../AxiosConfig/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image_Url } from "../../../Config/Config";

function EditBook({ bookId }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [genre, setGenre] = useState("");

  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    try {
      const getData = async (id) => {
        const res = await getEditBooks(id);
        const book=res.data.findBook
        setTitle(book?.title);
        setSummary(book?.summary || null);
        setGenre(book?.genre || null);
        setImage(book?.image || null);
        setPrice(book?.price||0)
      };
      getData(bookId);
    } catch (error) {
      toast.error("error fectching data");
    }
  }, [bookId]);

  async function handleEditBook(e) {
    e.preventDefault();
    if (
      title === "" ||
      summary === "" ||
      price === 0 ||
      genre === "" 
     
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    toast.error("Invalid price. Please enter a valid positive number.");
    return;
  }

    {
     
      const response = await editBook(title, summary, genre,price, bookId);
      
      if (response.data) {
        toast.success("successfully edited the book details");
        setTimeout(() => {
          setRedirect(true);
        }, 4000);
        
      }
    }
  }

  if (redirect) {
    
    return <Navigate to={"/publishedBooks"} />
      
      
   
  }

  return (
    <Container style={{ marginTop: "8rem" }}>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Row className="justify-content-center align-items-center ">
        
        <Col md={6}>
          <form className="regCard"
            onSubmit={handleEditBook}
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
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="summary" className="form-label">
                Genre
              </label>
              <input
                type="text"
                className="form-control"
                id="summary"
                placeholder="Enter summary"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Summary
              </label>
              <ReactQuill
                value={summary}
                onChange={(value) => setSummary(value)}
                placeholder="Write something..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="title"
                placeholder="Enter a price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {image && (
              <div className="mb-3">
                <div className="mt-1" style={{ height: "3rem" }}>
                  <strong>Current Image:</strong>
                  <img
                    src={`${Image_Url}/${image}`}
                    alt="Current Image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      margin: "1.3rem",
                    }}
                  />
                </div>
              </div>
            )}

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                Submit Edit 
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditBook;

