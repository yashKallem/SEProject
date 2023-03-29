import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Biography.css';

const Biography = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [params, setParams] = useState({
    firstName: '',
    lastName: '',
    courseOfStudy: '',
    educationLevel: '',
    email: '',

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
        email: props.email,

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
    let token = '';
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
        email: params.email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.httpStatus === 'OK') {
          setShowModal(false);
          setValidated(false);
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

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else if (!!params.newFirstName && !!params.newLastName && !!params.newCourseOfStudy && !!params.newEducationLevel) {
      updateBiography();
    }
    setValidated(true);
  };

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
          <Form noValidate validated={validated}>
            <FloatingLabel label="First name">
              <Form.Control required type="text" placeholder="First name" name="newFirstName" value={params.newFirstName} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Last name">
              <Form.Control required type="text" placeholder="Last name" name="newLastName" value={params.newLastName} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Course of study">
              <Form.Control required type="text" placeholder="Course of study" name="newCourseOfStudy" value={params.newCourseOfStudy} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Education level">
              <Form.Control required type="text" placeholder="Education level" name="newEducationLevel" value={params.newEducationLevel} onChange={handleChange} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Biography;