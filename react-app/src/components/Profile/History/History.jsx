import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './History.css';

const History = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [params, setParams] = useState({
    title: '',
    array: '',

    name: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (props) {
      setParams({
        ...params,
        title: props.title,
        array: props.array
      });
    }
  }, [props, params]);

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
    closeAddModal();
    // setShowAddModal(false);
    // setParams({
    //   name: '',
    //   startDate: '',
    //   endDate: ''
    // });
  }

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  }

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  }

  const updateHistory = () => {
    // Update table
    closeUpdateModal();
  }

  const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex(el => {
      return el.id === String(id);
    });
    if (requiredIndex === -1) {
      return false;
    };
    return !!arr.splice(requiredIndex, 1);
  };

  const deleteHistory = () => {
    // Remove from table
    params.setParams({
      ...params,
      array: removeById(params.array, 0)
    });
    closeUpdateModal();
  }

  const array2 = [['Job1', '2000'], ['Job2', '2005']];
  return (
    <div className="history-component">
      <div className="header">
        <h2>{params.title}</h2>
        <div>
          <FaPlus className="edit-icons" onClick={openAddModal} />
        </div>
      </div>
      <div className="table">
        {/* {params.array.map(item => ( */}
        {array2.map(item => (
          <div className="row">
            <div className="col">{item[0]}</div>
            <div className="col">{item[1]}</div>
            <div className="col">
              <FaEdit className="edit-icons" size={30} onClick={openUpdateModal} />
            </div>
          </div>
        ))}
      </div>
      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add {params.title} History</Modal.Title>
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
          <Modal.Title>Update {params.title} History</Modal.Title>
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
          <Button variant="danger" onClick={deleteHistory}>
            Delete
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