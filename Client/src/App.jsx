import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register.jsx";

import OtpVerify from "./Pages/OtpVerify.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import PublishedBooks from "./Pages/PublishedBooks.jsx";
import EditBooks from "./Pages/EditBooks.jsx";
import PublishNewBook from "./Pages/PublishNewBook.jsx";
import TaggedBooks from "./Pages/TaggedBooks.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verifyOtp/:email" element={<OtpVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homePage" element={<Home />} />
          <Route path="/publishedBooks" element={<PublishedBooks/>} />
          <Route path="/addBooks" element={<PublishNewBook/>} />
          <Route path="/editBooks/:id" element={<EditBooks/>} />
          <Route path="/taggedBooks" element={<TaggedBooks/>} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
