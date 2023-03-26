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

    newEmail: '',
    newPhone: '',
  });

  useEffect(() => {
    if (props) {
        setParams({
            email: props.email,
            phone: props.phone,
        
            newEmail: props.email,
            newPhone: props.phone,
        })
    }
  }, [props]);

  const openModal = () => {
    console.log(params);
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
        newEmail: params.email,
        newPhone: params.phone
      })
  }

  const updateContact = () => {
    setShowModal(false);
    setParams({
      ...params,
      email: params.newEmail,
      phone: params.newPhone
    });
    // Update table
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
            <FloatingLabel label="Email">
              <Form.Control type="text" placeholder="Email" name="newEmail" value={params.newEmail} onChange={handleChange} />
            </FloatingLabel>
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