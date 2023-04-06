import React, { useState, useEffect } from 'react';
import { updateById, removeById } from '../Utils';
import { FaPlus, FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Education.css';

const Education = (props) => {
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
    instituteName: '',
    startYear: '',
    endYear: '',
    degree: '',
    department: '',
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
      instituteName: elem.instituteName,
      startYear: elem.startYear,
      endYear: elem.endYear,
      degree: elem.degree,
      department: elem.department
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
      instituteName: '',
      startYear: '',
      endYear: '',
      degree: '',
      department: ''
    });
  }

  const closeConfirmationModal = () => {
    setShowModal(true);
    setShowConfirmationModal(false);
  }

  const addEducation = () => {
    fetch('http://localhost:8080/api/v1/education/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        instituteName: params.instituteName,
        startYear: params.startYear,
        endYear: params.endYear,
        degree: params.degree,
        department: params.department,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === ' INSTITUTE_ADDED !') {
          closeModal();
          setValidated(false);
          delete data.message;
          setArray([...array, data].sort((a, b) => {
            return a.startYear < b.startYear ? -1
              : a.startYear > b.startYear ? 1
                : 0;
          }));
        } else {
          console.log(data.message);
        }
      })
      .catch(error => console.error(error));
  }

  const updateEducation = () => {
    fetch('http://localhost:8080/api/v1/education/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: params.id,
        instituteName: params.instituteName,
        startYear: params.startYear,
        endYear: params.endYear,
        degree: params.degree,
        department: params.department,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === ' INSTITUTE_UPDATED !') {
          closeModal();
          setValidated(false);
          delete data.message;
          setArray(updateById(array, data).sort((a, b) => {
            return a.startYear < b.startYear ? -1
              : a.startYear > b.startYear ? 1
                : 0;
          }));
        } else {
          console.log(data.message);
        }
      })
      .catch(error => console.error(error));
  }

  const deleteEducation = () => {
    fetch('http://localhost:8080/api/v1/education/delete', {
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
        if (data.message === ' INSTITUTE_DELETED !') {
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
    } else if (!!params.instituteName && !!params.startYear && !!params.endYear && !!params.degree && !!params.department) {
      if (action === 'Add') {
        addEducation();
      } else if (action === 'Update') {
        updateEducation();
      }
    }
    setValidated(true);
  }

  return (
    <div className="education-component">
      <div className="header">
        <h2>Education</h2>
        {canEdit &&
          <div>
            <FaPlus className="edit-icons" onClick={openAddModal} />
          </div>
        }
      </div>
      <div className="table">
        {array.map(elem => (
          <div className="grid" key={elem.id}>
            <div className="title">{elem.instituteName} ({elem.startYear}-{elem.endYear})</div>
            {canEdit &&
              <FaEdit className="edit-icons" onClick={() => openUpdateModal(elem.id)} />
            }
            <div className="subtitle">{elem.degree}, {elem.department}</div>
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
          <Form noValidate validated={validated}>
            <FloatingLabel label="Institute name">
              <Form.Control required type="text" placeholder="Institute name" name="instituteName" value={params.instituteName} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="Start year">
              <Form.Control required type="number" placeholder="Start year" name="startYear" value={params.startYear} onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="End year">
              <Form.Control required type="number" placeholder="End year" name="endYear" value={params.endYear} onChange={handleChange} />
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
          <Modal.Title>Delete Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this institute?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteEducation}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Education;