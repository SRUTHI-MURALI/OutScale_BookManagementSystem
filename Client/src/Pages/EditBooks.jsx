import React from 'react';
import {  useParams } from 'react-router-dom';
import EditBook from '../Components/EditBook/EditBook';
import Header from '../Components/UserHome/Header';



function EditBooks() {
  
  const { id } = useParams();
  

  return (
    <div>
      <Header/>
      <EditBook bookId={id}/>
    </div>
  );
}

export default EditBooks;
