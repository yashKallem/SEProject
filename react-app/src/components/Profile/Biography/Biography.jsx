import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Biography.css';

const Biography = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState({
    firstName: '',
    lastName: '',
    courseOfStudy: '',
    educationLevel: '',

    newFirstName: '',
    newLastName: '',
    newCourseOfStudy: '',
    newEducationLevel: ''
  });

  useEffect(() => {
    if (props) {
      setParams({
        firstName: props.firstName,
        lastName: props.lastName,
        courseOfStudy: props.courseOfStudy,
        educationLevel: props.educationLevel,

        newFirstName: props.firstName,
        newLastName: props.lastName,
        newCourseOfStudy: props.courseOfStudy,
        newEducationLevel: props.educationLevel
      })
    }
  }, [props]);

  const openModal = () => {
    setShowModal(true);
  }

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value
    });
  }

  const closeModal = () => {
    setShowModal(false);
    setParams({
      ...params,
      newFirstName: params.firstName,
      newLastName: params.lastName,
      newCourseOfStudy: params.courseOfStudy,
      newEducationLevel: params.educationLevel,
    });
  }

  const updateBiography = () => {
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZUB0ZXN0LmVkdSIsImlhdCI6MTY3OTgwNTI2OSwiZXhwIjoxNjc5ODkxNjY5fQ.a0ejdeHuf9nMpyrUqpRT7n_o6vbHd63gnSey0yQlyMM';
    fetch('http://localhost:8080/api/v1/users/about', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        givenName: params.newFirstName,
        lastName: params.newLastName,
        courseOfStudy: params.newCourseOfStudy,
        educationLevel: params.newEducationLevel,
        email: "alice@test.edu" // TODO
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.httpStatus === 'OK') {
          setShowModal(false);
          setParams({
            ...params,
            firstName: params.newFirstName,
            lastName: params.newLastName,
            courseOfStudy: params.newCourseOfStudy,
            educationLevel: params.newEducationLevel,
          });
        } else {
          console.log(data.httpStatus);
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="biography-component">
      <div className="header">
        <h2>About</h2>
        <div className="edit-icons">
          <FaEdit onClick={openModal} />
        </div>
      </div>
      <div>{params.firstName} {params.lastName}</div>
      <div>{params.courseOfStudy}</div>
      <div>{params.educationLevel}</div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Biography</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel label="First name">
              <Form.Control type="text" placeholder="First name" name="newFirstName" value={params.newFirstName} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Last name">
              <Form.Control type="text" placeholder="Last name" name="newLastName" value={params.newLastName} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Course of study">
              <Form.Control type="text" placeholder="Course of study" name="newCourseOfStudy" value={params.newCourseOfStudy} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Education level">
              <Form.Control type="text" placeholder="Education level" name="newEducationLevel" value={params.newEducationLevel} onChange={handleChange} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={updateBiography}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Biography;