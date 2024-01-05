import React,{useEffect} from 'react'
import Header from '../Components/UserHome/Header'
import { Container } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import AllBooksList from '../Components/UserHome/AllBooksList'
import BookPublishForm from '../Components/PublishBook/BookPublishForm'

function PublishBook() {
  const navigate=useNavigate()
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/addBooks");
    }else{
      navigate("/login");

    }
  }, [navigate]);
  return (
   
     <Container>
      <Header/>
      <BookPublishForm/>
     </Container>
  
  )
}

export default PublishBook

