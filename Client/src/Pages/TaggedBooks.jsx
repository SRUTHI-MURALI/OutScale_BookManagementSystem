import React,{useEffect} from 'react'

import { Container } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import Header from '../Components/UserHome/Header';
import UserTaggedBooks from '../Components/UserTaggedBooks/UserTaggedBooks';

function TaggedBooks() {
    
  const navigate=useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/taggedBooks");
    }else{
      navigate("/login");

    }
  }, [navigate]);
  return (
    <Container>
      <Header page={"Tagged Books"} />
     <UserTaggedBooks/>
     </Container>
    
  
  )
}

export default TaggedBooks
