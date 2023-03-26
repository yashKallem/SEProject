import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Skills.css';

const Skills = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (props) {
      setEmail(props.email);
      setSkills(props.skills);
    }
  }, [props]);

  const openModal = () => {
    setShowModal(true);
  }

  const handleChange = (e) => {
    setNewSkill(e.target.value);
  }

  const closeModal = () => {
    setShowModal(false);
    setNewSkill('');
  }

  const addSkill = () => {
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZUB0ZXN0LmVkdSIsImlhdCI6MTY3OTgwNTI2OSwiZXhwIjoxNjc5ODkxNjY5fQ.a0ejdeHuf9nMpyrUqpRT7n_o6vbHd63gnSey0yQlyMM';
    fetch('http://localhost:8080/api/v1/skills/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        skill: newSkill,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.httpStatus === 'OK') {
          setShowModal(false);
          setSkills([...skills, newSkill]);
          setNewSkill('');
        } else {
          console.log(data.httpStatus);
        }
      })
      .catch(error => console.error(error));
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

  const deleteSkill = () => {
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZUB0ZXN0LmVkdSIsImlhdCI6MTY3OTgwNTI2OSwiZXhwIjoxNjc5ODkxNjY5fQ.a0ejdeHuf9nMpyrUqpRT7n_o6vbHd63gnSey0yQlyMM';
    fetch('http://localhost:8080/api/v1/skills/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: "", // TODO
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        setSkills(removeById(skills, 0));
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="skills-component">
      <div className="header">
        <h2>Skills</h2>
        <div className="edit-icons">
          <FaPlus onClick={openModal} />
        </div>
      </div>
      <div className="badges">
        {skills.map(skill => (
          <Badge bg="secondary">
            <div className="badge-content">
              {skill}
              <RxCross1 onClick={deleteSkill} />
            </div>
          </Badge>
        ))}
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel label="Skill">
              <Form.Control type="text" placeholder="Skill" name="newSkill" value={newSkill} onChange={handleChange} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addSkill}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Skills;