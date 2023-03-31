import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Biography from './Biography/Biography';
import Contact from './Contact/Contact';
import Education from './Education/Education';
import Skills from './Skills/Skills';
import './Profile.css';

const Profile = () => {
  const token = window.localStorage.getItem("token");
  const [params, setParams] = useState({
    firstName: '',
    lastName: '',
    email: '',
    courseOfStudy: '',
    educationLevel: '',
    phone: '',
    skills: [],
    colleges: [],
    jobs: []
  });

  const location = useLocation();
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/profile?email=${location.state.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        setParams({
          firstName: data.givenName,
          lastName: data.lastName,
          email: data.email,
          courseOfStudy: data.courseOfStudy,
          educationLevel: data.educationLevel,
          phone: data.phone,
          skills: data.skills,
          colleges: data.educationHistory,
          jobs: data.workHistory
        });
      })
      .catch(error => console.log(error));
  }, [location, token]);

  return (
    <div className="profile-page">
      <Navbar />
      <div className="sidebar-container">
        <div className="sidebar" id="summary">
          <div className="sidebar-content" id="biography">
            <Biography
              firstName={params.firstName}
              lastName={params.lastName}
              email={params.email}
              courseOfStudy={params.courseOfStudy}
              educationLevel={params.educationLevel}
            />
          </div>
          <div className="sidebar-content" id="contact">
            <Contact
              email={params.email}
              phone={params.phone}
            />
          </div>
          <div className="sidebar-content" id="skills">
            <Skills
              email={params.email}
              skills={params.skills}
            />
          </div>
        </div>
        <div className="sidebar" id="experience">
          <div className="sidebar-content" id="education">
            <Education
              email={params.email}
              array={params.colleges}
            />
          </div>
          <div className="sidebar-content" id="work">
            <Education
              email={params.email}
              array={params.jobs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

