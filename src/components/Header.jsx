import React, { useRef } from "react";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const searchRef = useRef();
    const nav = useNavigate();

    /** 검색 함수 */
    const handleSearch = (e) => {
        e.preventDefault();
        // console.log("handle search", sessionStorage.getItem("searchResult"));
        sessionStorage.removeItem("searchResult");
        sessionStorage.removeItem("searchType");
        sessionStorage.removeItem("movie");
        
        nav(`/movieList?search=${searchRef.current.value}`);
        searchRef.current.value = "";
    };

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container style={{ marginLeft: 10}}>
                    <Navbar.Brand href="/">
                        <img src="../image/wonflix.png" width="110" height="30" className="d-inline-block align-top mt-2" alt="React Bootstrap logo" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" className="link-item">Home</Link>
                        <Link to="/movieList" className="link-item">Movies</Link>
                    </Nav>
                </Container>
                <Form className="d-flex me-3" onSubmit={handleSearch}>
                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" ref={searchRef} />
                    <Button type="submit" variant="outline-danger">Search</Button>
                </Form>
            </Navbar>
        </div>
    );
};

export default Header;
