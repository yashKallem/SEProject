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
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (props) {
        setSkills(props.skills);
    }
  }, [props]);

  const openModal = () => {
    setShowModal(true);
  }

  const handleChange = (e) => {
    setSkill(e.target.value);
  }

  const closeModal = () => {
    setShowModal(false);
    setSkill('');
  }

  const addSkill = () => {
    setShowModal(false);
    setSkills([...skills, skill]);
    setSkill('');
    // Add to table
  }

  const deleteSkill = () => {
    // Remove from table
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
              <Form.Control type="text" placeholder="Skill" name="skill" value={skill} onChange={handleChange} />
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