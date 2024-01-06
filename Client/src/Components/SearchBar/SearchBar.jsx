import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { Base_Url } from "../../../Config/Config";
import { searchBooks } from "../AxiosConfig/AxiosConfig";
import { login } from "../Redux/UserSlice";

const SearchBar = ({ setSearchedBook }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchValue) {
        const response = await searchBooks(searchValue)
        console.log(response);
        setSearchedBook(response?.data?.results);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs={6}>
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="mr-sm-2"
            />
          </Col>
          <Col xs={3}>
            <Button type="submit" variant="info" className="add-button">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;
