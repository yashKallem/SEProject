import React, { useState, useEffect } from 'react';
import { updateById, removeById } from '../Utils';
import { FaPlus, FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Experience.css';

const Experience = (props) => {
  const token = window.localStorage.getItem("token");
  const [canEdit, setCanEdit] = useState(false);
  const [email, setEmail] = useState('');
  const [array, setArray] = useState([]);
  const [canUpdate, setCanUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [params, setParams] = useState({
    id: '',
    workTitle: '',
    companyName: '',
    workIndustry: '',
    fromDate: '',
    tillDate: '',
    description: ''
  });

  useEffect(() => {
    if (props) {
      setCanEdit(props.canEdit);
      setEmail(props.email);
      setArray(props.array);
    }
  }, [props]);

  const openAddModal = () => {
    setShowModal(true);
  }

  const openUpdateModal = (elemId) => {
    const idx = array.findIndex(el => {
      return el.id === elemId;
    });
    const elem = array[idx];

    setParams({
      id: elem.id,
      workTitle: elem.workTitle,
      companyName: elem.companyName,
      workIndustry: elem.workIndustry,
      fromDate: elem.fromDate,
      tillDate: elem.tillDate,
      description: elem.description
    });
    setCanUpdate(true);
    setShowModal(true);
  }

  const openConfirmationModal = () => {
    setShowModal(false);
    setShowConfirmationModal(true);
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
      id: '',
      workTitle: '',
      companyName: '',
      workIndustry: '',
      fromDate: '',
      tillDate: '',
      description: ''
    });
  }

  const closeConfirmationModal = () => {
    setShowModal(true);
    setShowConfirmationModal(false);
  }

  const addExperience = () => {
    fetch('http://localhost:8080/api/v1/work/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        workTitle: params.workTitle,
        companyName: params.companyName,
        workIndustry: params.workIndustry,
        fromDate: params.fromDate,
        tillDate: params.tillDate,
        description: params.description,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === ' WORK_ADDED !') {
          closeModal();
          setValidated(false);
          delete data.message;
          setArray([...array, data].sort((a, b) => {
            return a.fromDate < b.fromDate ? -1
              : a.fromDate > b.fromDate ? 1
                : 0;
          }));
        } else {
          console.log(data.message);
        }
      })
      .catch(error => console.error(error));
  }

  const updateExperience = () => {
    fetch('http://localhost:8080/api/v1/work/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: params.id,
        workTitle: params.workTitle,
        companyName: params.companyName,
        workIndustry: params.workIndustry,
        fromDate: params.fromDate,
        tillDate: params.tillDate,
        description: params.description,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === ' WORK_UPDATED !') {
          closeModal();
          setValidated(false);
          delete data.message;
          setArray(updateById(array, data).sort((a, b) => {
            return a.fromDate < b.fromDate ? -1
              : a.fromDate > b.fromDate ? 1
                : 0;
          }));
        } else {
          console.log(data.message);
        }
      })
      .catch(error => console.error(error));
  }

  const deleteExperience = () => {
    fetch('http://localhost:8080/api/v1/work/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: params.id,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === ' WORK_DELETED !') {
          setShowConfirmationModal(false);
          closeModal();
          setArray(removeById(array, params.id));
        } else {
          console.log(data.message);
        }
      })
      .catch(error => console.error(error));
  }

  const handleSubmit = (action, e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else if (!!params.workTitle && !!params.companyName && !!params.workIndustry && !!params.fromDate && !!params.tillDate && !!params.description) {
      if (action === 'Add') {
        addExperience();
      } else if (action === 'Update') {
        updateExperience();
      }
    }
    setValidated(true);
  }

  return (
    <div className="experience-component">
      <div className="header">
        <h2>Experience</h2>
        {canEdit &&
          <div>
            <FaPlus className="edit-icons" onClick={openAddModal} />
          </div>
        }
      </div>
      <div className="table">
        {array.map(elem => (
          <div className="grid" key={elem.id}>
            <div className="title">{elem.workTitle} ({new Date(elem.fromDate).getFullYear()}-{new Date(elem.tillDate).getFullYear()})</div>
            {canEdit &&
              <FaEdit className="edit-icons" onClick={() => openUpdateModal(elem.id)} />
            }
            <div className="subtitle">{elem.companyName} | {elem.workIndustry}</div>
            <div className="description">{elem.description}</div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          {canUpdate
            ? <Modal.Title>Update Experience</Modal.Title>
            : <Modal.Title>Add Experience</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3">
              <FloatingLabel label="Work title">
                <Form.Control required type="text" placeholder="Work title" name="workTitle" value={params.workTitle} onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Company name">
                <Form.Control required type="text" placeholder="Company name" name="companyName" value={params.companyName} onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Work industry">
                <Form.Control required type="text" placeholder="Work industry" name="workIndustry" value={params.workIndustry} onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Start date">
                <Form.Control required type="date" placeholder="Start date" name="fromDate" value={params.fromDate} onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="End date">
                <Form.Control required type="date" placeholder="End date" name="tillDate" value={params.tillDate} onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Description">
                <Form.Control required type="text" placeholder="Description" name="description" value={params.description} onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        {canUpdate
          ? <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="danger" onClick={openConfirmationModal}>
              Delete
            </Button>
            <Button variant="primary" onClick={(e) => handleSubmit("Update", e)}>
              Save
            </Button>
          </Modal.Footer>
          : <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => handleSubmit("Add", e)}>
              Add
            </Button>
          </Modal.Footer>
        }
      </Modal>

      <Modal show={showConfirmationModal} onHide={closeConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this experience?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteExperience}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Experience;