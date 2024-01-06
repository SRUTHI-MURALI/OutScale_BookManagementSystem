import React,{useEffect} from 'react'
import Header from '../Components/UserHome/Header'
import { Container } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import UserPublishedBooksList from '../Components/UserPublishedBooks/UserPublishedBooksList'

function PublishedBooks() {
    
  const navigate=useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/publishedBooks");
    }else{
      navigate("/login");

    }
  }, [navigate]);
  return (
    <Container>
      <Header page={"Published Books"} />
     <UserPublishedBooksList/>
     </Container>
    
  
  )
}

export default PublishedBooks
