import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar=()=>{
  return (
    <>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/feed">Campus Collaborate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
           </Nav>
        </Container>
      </Navbar>


    </>
  );
}

export default NavigationBar;