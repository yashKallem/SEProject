import React, { useState, useEffect } from 'react';
import {filterById, removeById} from '../Utils';
import { FaPlus, FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './History.css';

const History = (props) => {
  const [array, setArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [params, setParams] = useState({
    id: -1,
    instituteName: '',
    startDate: '',
    endDate: '',
    degree: '',
    department: '',
  });

  useEffect(() => {
    if (props) {
      setArray(props.array);
    }
  }, [props]);

  const openAddModal = () => {
    setShowModal(true);
  }

  const openUpdateModal = (elemId) => {
    setParams({
      id: elemId,
      instituteName: 'Some School',
      startDate: 'Fake',
      endDate: 'Data',
      degree: 'Some Degree',
      department: 'Some Department',
    });
    setCanUpdate(true);
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
    setCanUpdate(false);
    setParams({
      id: -1,
      instituteName: '',
      startDate: '',
      endDate: '',
      degree: '',
      department: '',
    });
  }

  const addHistory = () => {
    // Add to table
    closeModal();
    // setShowAddModal(false);
    // setParams({
    //   name: '',
    //   startDate: '',
    //   endDate: ''
    // });
  }

  const updateHistory = () => {
    // Update table
    closeModal();
  }

  const deleteHistory = () => {
    // Remove from table
    closeModal();
    setArray(removeById(array, params.id));
  }

  const array2 = [['Job1', '2000'], ['Job2', '2005']];
  return (
    <div className="history-component">
      <div className="header">
        <h2>Education</h2>
        <div>
          <FaPlus className="edit-icons" onClick={openAddModal} />
        </div>
      </div>
      <div className="table">
        {/* {params.array.map(elem => ( */}
        {array2.map(elem => (
          <div className="row">
            <div className="col">{elem[0]}</div>
            <div className="col">{elem[1]}</div>
            <div className="col">
              <FaEdit className="edit-icons" size={30} onClick={() => openUpdateModal(elem.id)} />
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          {canUpdate
            ? <Modal.Title>Update Education</Modal.Title>
            : <Modal.Title>Add Education</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel label="Institute Name">
              <Form.Control required type="text" placeholder="Name" name="instituteName" value={params.instituteName} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Start date">
              <Form.Control required type="date" placeholder="Start date" name="startDate" value={params.startDate} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="End date">
              <Form.Control required type="date" placeholder="End date" name="endDate" value={params.endDate} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Degree">
              <Form.Control required type="text" placeholder="Degree" name="degree" value={params.degree} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Department">
              <Form.Control required type="text" placeholder="Department" name="department" value={params.department} onChange={handleChange} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        {canUpdate
          ? <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteHistory}>
              Delete
            </Button>
            <Button variant="primary" onClick={updateHistory}>
              Save
            </Button>
          </Modal.Footer>
          : <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={addHistory}>
              Add
            </Button>
          </Modal.Footer>
        }
      </Modal>
    </div>
  );
}

export default History;