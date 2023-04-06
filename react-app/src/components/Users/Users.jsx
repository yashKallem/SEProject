import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './Users.css';

const Users = () => {
  const token = window.localStorage.getItem("token");
  const email = window.localStorage.getItem("email");
  const [keyword, setKeyword] = useState('');
  const [array, setArray] = useState([]);

  useEffect(() => {
    fetch(`url${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setArray([]);
      })
      .catch(error => console.log(error));
  }, [email, token]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  const searchByFirstName = () => {
    fetch(`url${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setArray([]);
      })
      .catch(error => console.log(error));
  }

  const searchByLastName = () => {
    fetch(`url${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setArray([]);
      })
      .catch(error => console.log(error));
  }

  const searchByEmail = () => {
    fetch(`url${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setArray([]);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="users-page">
      <Navbar />
      <div className="search-bar">
        <InputGroup>
          <FloatingLabel label="User">
            <Form.Control placeholder="User" name="keyword" value={keyword} onChange={handleChange} />
          </FloatingLabel>
          <DropdownButton variant="outline-secondary" title="Search by" align="end">
            <Dropdown.Item onClick={searchByFirstName}>First name</Dropdown.Item>
            <Dropdown.Item onClick={searchByLastName}>Last name</Dropdown.Item>
            <Dropdown.Item onClick={searchByEmail}>Email</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </div>
      <div className="search-results">
        {array.map(elem => (
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{elem.firstName} {elem.lastName}</Card.Title>
              <Card.Subtitle>{elem.courseOfStudy}</Card.Subtitle>
              <Card.Text>
                Skills: {elem.skills.join(', ')}
              </Card.Text>
              <Card.Link as={Link} state={{ email: elem.email }} to="/profile">View profile</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Users;