import React, { useState, useEffect } from "react";
import "./Profile.css";
import pic from "../../assets/no image.png";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserBooks, getUserProfile } from "../AxiosConfig/AxiosConfig";
import UserEditProfileForm from "./UserEditProfileForm";
import { FaEdit } from "react-icons/fa";
import UserEditProfilePictureForm from "./UserEditProfilePictureForm";
import { Link } from "react-router-dom";

const UserProfileForm = () => {
  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  const [user, setUser] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditpic, setShowEditPic] = useState(false);

  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const response = await getUserProfile(id);
        setUser(response.data.userDetails);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(parseData._id);
  }, [showEdit]);

  useEffect(() => {
    try {
      const books = async (userId) => {
        const res = await getUserBooks(userId);

        setAllBooks(res.data.booksFind);
      };
      books(parseData._id);
    } catch (error) {
      toast.error("Error fetching notes");
    }
  }, []);

  const handleEditUserProfile = async () => {
    setShowEdit(true);
  };

  const handleEditUserProfilePic = async () => {
    setShowEditPic(true);
  };

  const handleClose = async () => {
    setShowEdit(false);
  };

  const handleCloseImage = async () => {
    window.location.reload();
    setShowEditPic(false);
  };

  return (
    <Container className="bodyContainer ">
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Row >
        <Col lg="3" key={user._id}>
          <Card.Body className="text-center mt-5">
            {user?.photo && user?.photo !== "No Pic" ? (
              <Card.Img
                style={{ width: "200px", height: "200px" }}
                src={`${Image_Url}/${user?.photo}`}
                alt="profile"
                className="rounded-circle"
              />
            ) : (
              <Card.Img
                style={{ width: "200px" }}
                src={pic}
                className="rounded-circle"
                alt="default"
              />
            )}
            <p className="text-muted mb-1" onClick={handleEditUserProfilePic}>
              {" "}
              Update Profile Photo
            </p>
          </Card.Body>
        </Col>

        <Col lg="8">
          <Card className="mb-4 mt-3">
            <Card.Body>
              <Row >
                <Col sm="3">
                  <Card.Text>Full Name</Card.Text>
                </Col>
                <Col sm="9">
                  <Card.Text className="text-muted">{user?.name}</Card.Text>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="3">
                  <Card.Text>Email</Card.Text>
                </Col>
                <Col sm="9">
                  <Card.Text className="text-muted">{user?.email}</Card.Text>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="3">
                  <Card.Text>Phone</Card.Text>
                </Col>
                <Col sm="9">
                  <Card.Text className="text-muted">{user?.phone}</Card.Text>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="3">
                  <Card.Text>Age</Card.Text>
                </Col>
                <Col sm="9">
                  <Card.Text className="text-muted">
                    {user?.age} Years
                  </Card.Text>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="3">
                  <Card.Text>Country</Card.Text>
                </Col>
                <Col sm="9">
                  <Card.Text className="text-muted">{user?.country}</Card.Text>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="3">
                  <Card.Text>Gender</Card.Text>
                </Col>
                <Col sm="9">
                  <Card.Text className="text-muted">{user?.gender}</Card.Text>
                </Col>
              </Row>
              
            </Card.Body>
            
          </Card>
        </Col>
        <Col lg="1">
        <Button variant="none" onClick={handleEditUserProfile}>
                <FaEdit size={25} />
              </Button>
        </Col>
      </Row>
    
      <Row xs={12} md={6}>
        {showEdit && <UserEditProfileForm onClose={handleClose} user={user} />}
        {showEditpic && (
          <UserEditProfilePictureForm onClose={handleCloseImage} user={user} />
        )}
      </Row>
      <Row>
          <p className="allcourses-header"> Books By {user?.name}</p>
          {console.log(allBooks,'kjhj')}
          {allBooks?.map((book) => (
            <Col md={3} key={book._id}>
             <Link to={`/publishedBooks`}>
                <div className="mb-4" style={{ height: '200px' }}>
                  <Card.Body className="text-center">
                    <Card.Img
                      style={{ height: '200px' }}
                      variant="top"
                      src={`${Image_Url}/${book?.image}`}
                    />
                  </Card.Body>
                </div>
                </Link>
            </Col>
          ))}
        </Row>
    </Container>
  );
};

export default UserProfileForm;
