import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserSlice";
import logo from "../../assets/outscale.jpeg"

import "./Home.css";

function Header({ page }) {
  const [name] = useState(page);
  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isHome = location.pathname === "/homePage";
  const isPublish = location.pathname === "/addBooks";
  const isPublished = location.pathname === "/publishedBooks";
  const isProfile = location.pathname === "/userProfile";
  const isTagged = location.pathname === "/taggedBooks";

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    await dispatch(logout);
    navigate("/login");
  };

  return (
    
      <Navbar className="navbar-student d-flex" fixed="top" expand="lg">
        <img
        className="logo m-1"
        style={{ height: "4rem", width: "12rem" }}
        src={logo}
      />
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
            <Link
              className={`nav-header-student ${isHome ? "highlight" : ""}`}
              to="/homePage"
            >
              Home
            </Link>
            <Link
              className={`nav-header-student ${isPublish ? "highlight" : ""}`}
              to="/addBooks"
            >
              Add
            </Link>

            <Link
              className={`nav-header-student ${isPublished ? "highlight" : ""}`}
              to="/publishedBooks"
            >
               Published
            </Link>

            <Link
              className={`nav-header-student ${isTagged ? "highlight" : ""}`}
              to="/taggedBooks"
            >
              Tagged
            </Link>
          </Nav>

          <Container className="d-flex justify-content-center align-items-center">
            <h1
              style={{
                fontSize: "larger",
                color: "white",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {name ? name : "Welcome " + parseData?.name}
            </h1>
          </Container>
          <Nav.Link
              className={`nav-header-student ${isProfile ? "highlight" : ""}`}
              href="/userProfile"
            >
              Profile
            </Nav.Link>

          <Link to="" onClick={handleLogout}>
            <Button className="m-3">Logout</Button>
          </Link>
        </Navbar.Collapse>
       </Container>
      </Navbar>
  
  );
}

export default Header;
