import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Contact.css';

const Biography = (props) => {
  const token = window.localStorage.getItem("token");
  const [canEdit, setCanEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [params, setParams] = useState({
    email: '',
    phone: '',
    newPhone: ''
  });

  useEffect(() => {
    if (props) {
      setCanEdit(props.canEdit);
      setParams({
        email: props.email,
        phone: props.phone,
        newPhone: props.phone
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
      newPhone: params.phone
    });
  }

  const updateContact = () => {
    fetch('http://localhost:8080/api/v1/users/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email: params.email,
        phone: params.newPhone
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === ' CONTACT_UPDATED !') {
          setShowModal(false);
          setValidated(false);
          setParams({
            ...params,
            phone: params.newPhone
          });
        } else {
          console.log(data.message);
        }
      })
      .catch(error => console.error(error));
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else if (!!params.newPhone) {
      updateContact();
    }
    setValidated(true);
  }

  return (
    <div className="contact-component">
      <div className="header">
        <h2>Contact Information</h2>
        {canEdit &&
          <div className="edit-icons">
            <FaEdit onClick={openModal} />
          </div>
        }
      </div>
      <div>{params.email}</div>
      <div>{params.phone}</div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3" >
              <FloatingLabel label="Email">
                <Form.Control disabled defaultValue={params.email} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" >
              <FloatingLabel label="Phone">
                <Form.Control required type="text" placeholder="Phone" name="newPhone" value={params.newPhone} onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
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