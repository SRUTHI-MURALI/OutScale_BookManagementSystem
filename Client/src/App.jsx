import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register.jsx";

import OtpVerify from "./Pages/OtpVerify.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import PublishedBooks from "./Pages/PublishedBooks.jsx";
import PublishBook from "./Pages/PublishBook.jsx";
import EditBooks from "./Pages/EditBooks.jsx";


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
          <Route path="/addBooks" element={<PublishBook/>} />
          <Route path="/editBooks/:id" element={<EditBooks/>} />
          <Route path="/addBooks" element={<PublishBook/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
