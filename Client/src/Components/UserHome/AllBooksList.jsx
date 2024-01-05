import React, { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { getBooks } from "../AxiosConfig/AxiosConfig";
import SearchBar from "../SearchBar/SearchBar";
import nil from "../../assets/No books.png"

function AllBooksList() {
  const [allBooks, setAllBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedBook, setSearchedBook] = useState([]);
  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  const navigate = useNavigate();

  const handleAddBooks = (e) => {
    e.preventDefault();
    navigate("/addBooks");
  };

  useEffect(() => {
    try {
      const books = async () => {
        const res = await getBooks();

        setAllBooks(res.data.allBooks);
       
      };
      books();
    } catch (error) {
      toast.error("Error fetching notes");
    }
  }, []);

  useEffect(() => {
    try {
      setAllBooks(searchedBook);
    } catch (error) {
      toast.error("Error fetching notes");
    }
  }, [searchedBook]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  let PageSize = 8;
  const pageCount = Math.ceil(allBooks.length / PageSize);

  const currentTableData = useMemo(() => {
    const firstPage = currentPage * PageSize;
    const lastPage = Math.min(firstPage + PageSize, allBooks.length);
    return allBooks.slice(firstPage, lastPage);
  }, [allBooks, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  
  

  return (
    <>
      <Container className="body-class  ">
        <>
          <ToastContainer
            position="top-center"
            autoClose={3000}
          ></ToastContainer>

       {currentTableData.length > 0 ? (
          <Row className="mb-5">
           
              <Col xs={8} md={6} className="float-left ">
                <SearchBar setSearchedNote={setSearchedBook} />
              </Col>
          
            <Col xs={4} md={6}>
              <Button
                className="float-end add-button"
                variant="info"
                onClick={handleAddBooks}
              >
                {" "}
                Add a Book{" "}
              </Button>
            </Col>
            
          </Row>
          ):(
            <Row className="mb-5">
           
             
          
            <Col xs={3} md={7}>
              <Button
                className="float-end add-button"
                variant="info"
                onClick={handleAddBooks}
              >
                {" "}
                Be the first to add a Book{" "}
              </Button>
            </Col>
            
          </Row>
          )}

          {currentTableData.length > 0 && (
            <Row>
              {allBooks
                ? currentTableData.map((book) => (
                    <React.Fragment key={book._id}>
                      <Col xs={12} sm={6} md={4} className="mt-3 ">
                        <Link style={{ textDecoration: "none" }}>
                          <div style={{ width: "15rem", height: "16rem" }}>
                            <Card.Img
                              style={{ height: "14rem" }}
                              variant="top"
                              
                            />
                          </div>
                        </Link>
                      </Col>
                      <Col xs={12} sm={6} md={5} className="mt-5">
                        <h3
                          style={{ marginBottom: "10px", fontWeight: "bold" }}
                        >
                          {book?.title}
                        </h3>
                        <p style={{ color: "gray" }}>
                          {formatDate(book?.createdAt)}
                        </p>
                        <p style={{ marginBottom: "5px" }}>{book?.genre}</p>
                        
                        <p
                          style={{ marginBottom: "5px" }}
                          dangerouslySetInnerHTML={{ __html: book?.summary }}
                        ></p>
                      </Col>
                      <Col xs={12} sm={6} md={3} className="mt-3">
                        
                        

                       
                      </Col>
                    </React.Fragment>
                  ))
                : null}
            </Row>
          )}

          {currentTableData.length > 0 && (
            <Container className="d-flex justify-content-center mt-3">
              <ReactPaginate
                previousLabel={<FaBackward />}
                nextLabel={<TbPlayerTrackNextFilled />}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Container>
          )}
        </>
        {allBooks.length === 0 && (
          <>
            <Col xs={12} className="d-flex justify-content-center">
              <img
                style={{ height: "20rem", width: "25rem" }}
                
                alt="No Data"
                src={nil}
              />
            </Col>
            <p
              className="d-flex justify-content-center"
              style={{ fontSize: "2rem" }}
            >
              No Books Found
            </p>
          </>
        )}
      </Container>
    </>
  );
}

export default AllBooksList;
