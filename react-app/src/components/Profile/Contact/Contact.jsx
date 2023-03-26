import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Contact.css';

const Contact = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState({
    email: '',
    phone: '',

    newPhone: '',
  });

  useEffect(() => {
    if (props) {
      setParams({
        email: props.email,
        phone: props.phone,

        newPhone: props.phone,
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
    })
  }

  const updateContact = () => {
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZUB0ZXN0LmVkdSIsImlhdCI6MTY3OTgwNTI2OSwiZXhwIjoxNjc5ODkxNjY5fQ.a0ejdeHuf9nMpyrUqpRT7n_o6vbHd63gnSey0yQlyMM';
    fetch('http://localhost:8080/api/v1/users/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        phone: params.newPhone,
        email: params.email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.httpStatus === 'OK') {
          setShowModal(false);
          setParams({
            ...params,
            phone: params.newPhone
          });
        } else {
          console.log(data.httpStatus);
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="contact-component">
      <div className="header">
        <h2>Contact Information</h2>
        <div className="edit-icons">
          <FaEdit onClick={openModal} />
        </div>
      </div>
      <div>{params.email}</div>
      <div>{params.phone}</div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel label="Phone">
              <Form.Control type="text" placeholder="Phone" name="newPhone" value={params.newPhone} onChange={handleChange} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={updateContact}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Contact;