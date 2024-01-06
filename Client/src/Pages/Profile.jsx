import React,{useEffect} from 'react'

import { Container } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

import Header from '../Components/UserHome/Header'
import UserProfileForm from '../Components/UserProfile/UserProfileForm'

function Profile() {
    
  const navigate=useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/userProfile");
    }else{
      navigate("/login");

    }
  }, [navigate]);
  return (
    <Container>
      <Header page={"User Profile"} />
     <UserProfileForm/>
     </Container>
    
  
  )
}

export default Profile
