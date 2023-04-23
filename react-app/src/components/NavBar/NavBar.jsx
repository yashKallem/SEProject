import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
  const email = window.localStorage.getItem('email');
  const handleSignOut = () => {
   const token = window.localStorage.getItem("token");
    console.log(email);
    console.log(token);
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/feed">Campus Collaborate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
            <Nav.Link as={Link}>Projects</Nav.Link>
            <Nav.Link as={Link} to="/users">Users</Nav.Link>
            <Nav.Link as={Link} state={{ email: email }} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={handleSignOut}>Sign Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
