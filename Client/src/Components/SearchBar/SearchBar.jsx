import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { searchBooks } from "../AxiosConfig/AxiosConfig";


const SearchBar = ({ setSearchedBook }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchValue) {
        const response = await searchBooks(searchValue)
        console.log(response.data);
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
