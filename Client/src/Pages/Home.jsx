import React,{useEffect} from 'react'
import Header from '../Components/UserHome/Header'
import { Container } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import AllBooksList from '../Components/UserHome/AllBooksList'

function Home() {
  const navigate=useNavigate()
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/homePage");
    }else{
      navigate("/login");

    }
  }, [navigate]);
  return (
   
     <Container>
      <Header/>
      <AllBooksList/>
     </Container>
  
  )
}

export default Home
