import React, { useState } from 'react';
import { FaPlus, FaEdit, FaCheck, FaMinus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './History.css';

const History = ({ title, array }) => {
  const [canEdit, setCanEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState({
    name: '',
    startYear: '',
    endYear: ''
  });

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
      name: '',
      startYear: '',
      endYear: ''
    });
  }

  const addHistory = () => {
    setShowModal(false);
    // Add to table
    setParams({
      name: '',
      startYear: '',
      endYear: ''
    });
  }

  const deleteHistory = () => {
    // Remove from table
  }

  const editHistory = () => {
    setCanEdit(true);
  }

  const saveHistory = () => {
    setCanEdit(false);
  }

  const array2 = [['Job1', '2000'], ['Job2', '2005']];
  return (
    <div className="history-component">
      <div className="header">
        <h2>{title}</h2>
        <div className="edit-icons">
          <FaPlus onClick={openModal} />
          {canEdit
            ? <FaCheck onClick={saveHistory} />
            : <FaEdit onClick={editHistory} />
          }
        </div>
      </div>
      <div className="table">
        {/* {array.map(item => ( */}
        {array2.map(item => (
          <div className="row">
            <div className="col">{item[0]}</div>
            <div className="col">{item[1]}</div>
            {canEdit &&
              <FaMinus className="col" onClick={deleteHistory} />
            }
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add {title} History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel label="Name">
              <Form.Control type="text" placeholder="Name" name="name" value={params.name} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Start year">
              <Form.Control type="number" maxLength="4" placeholder="Start year" name="startYear" value={params.startYear} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="End year">
              <Form.Control type="number" maxLength="4" placeholder="End year" name="endYear" value={params.endYear} onChange={handleChange} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addHistory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default History;