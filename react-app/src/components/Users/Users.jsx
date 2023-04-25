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
    if (!token) {
      window.location.href = "/";
      return;
    }

    fetch(`http://localhost:8080/api/v1/users/all`, {
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
        setArray(data);
      })
      .catch(error => console.log(error));
  }, [email, token]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  const searchByFirstName = () => {
    if (!!keyword) {
      const lastName = "";
      fetch(`http://localhost:8080/api/v1/users/search?firstname=${keyword}&lastname=${lastName}`, {
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
          setArray(data);
        })
        .catch(error => console.log(error));
    }
  }

  const searchByLastName = () => {
    if (!!keyword) {
      const firstName = "";
      fetch(`http://localhost:8080/api/v1/users/search?firstname=${firstName}&lastname=${keyword}`, {
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
          setArray(data);
        })
        .catch(error => console.log(error));
    }
  }

  const searchByEmail = () => {
    if (!!keyword) {
      fetch(`http://localhost:8080/api/v1/users/profile?email=${keyword}`, {
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
          setArray([data]);
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div className="users-page">
      <Navbar />
      <div className="users-search">
        <div className="search-bar">
          <InputGroup className="mb-3">
            <FloatingLabel label="User">
              <Form.Control required placeholder="User" name="keyword" value={keyword} onChange={handleChange} />
            </FloatingLabel>
            <DropdownButton variant="outline-secondary" title="Search by" align="end">
              <Dropdown.Item onClick={searchByFirstName}>First name</Dropdown.Item>
              <Dropdown.Item onClick={searchByLastName}>Last name</Dropdown.Item>
              <Dropdown.Item onClick={searchByEmail}>Email</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </div>
        <div className="search-results">
          {array.length !== 0 && array.map(elem => (
            <Card style={{ width: '18rem' }} key={elem.id}>
              <Card.Body>
                <Card.Title>{elem.givenName} {elem.lastName}</Card.Title>
                <Card.Subtitle>{elem.courseOfStudy}</Card.Subtitle>
                <Card.Text>
                  {elem.skills.length !== 0 && elem.skills.map(item => item.skill).join(', ')}
                </Card.Text>
                <Card.Link as={Link} state={{ email: elem.email }} to="/profile">View profile</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;