import React, { useState } from 'react';
import { FaPlus, FaEdit, FaCheck, FaMinus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './History.css';

const History = ({ title, array }) => {
  const [canEdit, setCanEdit] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [params, setParams] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });

  const openAddModal = () => {
    setShowAddModal(true);
  }

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value
    });
  }

  const closeAddModal = () => {
    setShowAddModal(false);
    setParams({
      name: '',
      startDate: '',
      endDate: ''
    });
  }

  const addHistory = () => {
    // Add to table
    setShowAddModal(false);
    setParams({
      name: '',
      startDate: '',
      endDate: ''
    });
  }

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  }

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  }

  const updateHistory = () => {
    // Update table
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
          <FaPlus onClick={openAddModal} />
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
              <div className="col">
                <MdEdit onClick={openUpdateModal} />
                <FaMinus onClick={deleteHistory} />
              </div>
            }
          </div>
        ))}
      </div>
      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add {title} History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel label="Name">
              <Form.Control type="text" placeholder="Name" name="name" value={params.name} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Start date">
              <Form.Control type="date" placeholder="Start date" name="startDate" value={params.startDate} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="End date">
              <Form.Control type="date" placeholder="End date" name="endDate" value={params.endDate} onChange={handleChange} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addHistory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add {title} History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel label="Name">
              <Form.Control type="text" placeholder="Name" name="name" value={params.name} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Start date">
              <Form.Control type="date" placeholder="Start date" name="startDate" value={params.startDate} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="End date">
              <Form.Control type="date" placeholder="End date" name="endDate" value={params.endDate} onChange={handleChange} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={updateHistory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default History;