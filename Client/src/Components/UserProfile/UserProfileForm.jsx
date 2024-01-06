import React, { useState, useEffect } from "react";
import "./Profile.css";
import pic from "../../assets/no image.png";
import { Container, Button } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserProfile } from "../AxiosConfig/AxiosConfig";
import UserEditProfileForm from "./UserEditProfileForm";


const UserProfileForm = () => {
  const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;

  const [user, setUser] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

 

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

  

  const handleEditUserProfile = async () => {
    setShowEdit(true);
  };

  const handleClose = async () => {
    setShowEdit(false);
  };
  

  return (
    <Container className="bodyContainer">
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      {!showEdit ? (
        <>
          <div className="col-lg-12">
            <div className="row mt-3">
              <div className="col-md-3">
                {user?.photo && user?.photo !== "No Pic" ? (
                  <img
                    style={{ width: "200px" }}
                    src={`${Image_Url}/${user?.photo}`}
                    alt="profile"
                    className="rounded-circle"
                  />
                ) : (
                  <img
                    style={{ width: "200px" }}
                    src={pic}
                    className="rounded-circle"
                    alt="default"
                  />
                )}
              </div>

              <div className="col-lg-6">
                <p style={{ color: "#5B5B5B", fontFamily: "Open Sans sans-serif" }}>
                  <h4>Name : {user?.name}</h4>
                  <h4>Gender : {user?.gender}</h4>
                  <h4>Age : {user?.age}</h4>
                  <h4>Country : {user?.country}</h4>
                  <h4>Phone : {user?.phone}</h4>
                  <h4>Email : {user?.email}</h4>
                </p>
              </div>
              <div className="col-lg-2">
                <Button onClick={handleEditUserProfile}>Update Profile</Button>
              </div>
            </div>
          </div>
       
        </>
      ) : (
        <UserEditProfileForm onClose={handleClose} user={user} />
      )}
    </Container>
  );
};

export default UserProfileForm;
