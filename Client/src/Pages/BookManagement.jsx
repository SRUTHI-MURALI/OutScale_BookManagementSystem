import React,{useEffect} from 'react'
import Header from '../Components/UserHome/Header'
import { Container } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

function Bookmanagement() {
  const navigate=useNavigate()
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/");
    }else{
      navigate("/login");

    }
  }, [navigate]);
  return (
   
     <Container>
      <Header/>
     
     </Container>
  
  )
}

export default Bookmanagement
