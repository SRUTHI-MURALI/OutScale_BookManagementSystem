import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo4.png";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserSlice";
// import image from "../../assets/images (1).jpeg";
// import home from "../../assets/home.png";

import "./Home.css";

function Header({ page }) {
  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTags = async () => {
    navigate("/tagsPage");
  };

  const handleHome = async () => {
    navigate("/homePage");
  };

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    await dispatch(logout);
    navigate("/login");
  };

  return (
    <Navbar className="navbar-student d-flex" fixed="top" expand="lg">
      <img
        className="logo m-1"
        style={{ height: "4rem", width: "10rem" }}
        src={logo}
      />
      <Navbar.Toggle
        aria-controls="navbarScroll"
        className="custom-navbar-toggle "
        style={{ backgroundColor: "white" }}
      />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1  ">
          <h1
            style={{
              fontSize: "larger",
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            className="ml-auto"
          >
            Welcome {parseData?.name}{" "}
          </h1>
        </div>
        {page !== "tags" ? (
          <div>
            <Button variant="none" onClick={handleTags}>
              <img
                style={{ height: "4rem", width: "4rem" }}
                src={image}
                alt="Tag Icon"
              />
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="none" onClick={handleHome}>
              <img
                style={{ height: "4rem", width: "4rem" }}
                src={home}
                alt="Tag Icon"
              />
            </Button>
          </div>
        )}

        <div className="ms-auto">
          <Link onClick={handleLogout}>
            <Button className="m-3">Logout</Button>
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
