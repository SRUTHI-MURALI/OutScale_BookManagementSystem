import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserSlice";

import "./Home.css";

function Header({ page }) {
  const [name, setName] = useState(page);
  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isHome = location.pathname === "/homepage";
  const isPublish = location.pathname === "/addBooks";
  const isPublished = location.pathname === "/publishedBooks";
  const isProfile = location.pathname === "/studentprofile";

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    await dispatch(logout);
    navigate("/login");
  };

  return (
    
      <Navbar className="navbar-student d-flex" fixed="top" expand="lg">
        <Navbar.Toggle
          aria-controls="navbarScroll"
          className="custom-navbar-toggle "
          style={{ backgroundColor: "white" }}
        />

       <Container>
       <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: "80px" }}
            navbarScroll
          >
            <Nav.Link
              className={`nav-header-student ${isHome ? "highlight" : ""}`}
              href="/homepage"
            >
              Home
            </Nav.Link>
            <Nav.Link
              className={`nav-header-student ${isPublish ? "highlight" : ""}`}
              href="/addBooks"
            >
              Publish
            </Nav.Link>

            <Nav.Link
              className={`nav-header-student ${isPublished ? "highlight" : ""}`}
              href="/publishedBooks"
            >
              Published
            </Nav.Link>

            <Nav.Link
              className={`nav-header-student ${isProfile ? "highlight" : ""}`}
              href="/studentprofile"
            >
              Profile
            </Nav.Link>
          </Nav>

          <h1
            style={{
              fontSize: "larger",
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            className="ml-auto"
          >
            {name ? name : "welcome " + parseData?.name}
          </h1>

          <Link to="" onClick={handleLogout}>
            <Button className="m-3">Logout</Button>
          </Link>
        </Navbar.Collapse>
       </Container>
      </Navbar>
  
  );
}

export default Header;
