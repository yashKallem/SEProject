import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
  const location = useLocation();
  return (
    <>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/feed">Campus Collaborate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/feed" state={{ token: location.state.token, email: location.state.email }}>Feed</Nav.Link>
            <Nav.Link as={Link} to="/profile" state={{ token: location.state.token, email: location.state.email }}>Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;