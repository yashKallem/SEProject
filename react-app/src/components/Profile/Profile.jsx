import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Biography from './Biography/Biography';
import Contact from './Contact/Contact';
import History from './History/History';
import Skills from './Skills/Skills';
import './Profile.css';

const Profile = () => {
  const [params, setParams] = useState({
    firstName: '',
    lastName: '',
    courseOfStudy: '',
    educationLevel: '',
    email: '',
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
        'Authorization': `Bearer ${location.state.token}`
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
          courseOfStudy: data.courseOfStudy,
          educationLevel: data.educationLevel,
          email: data.email,
          phone: data.phone,
          skills: data.skills,
          colleges: data.educationHistory,
          jobs: data.workHistory
        });
      })
      .catch(error => console.log(error));
  }, [location]);

  return (
    <div className="profile-page">
      <Navbar />
      <div className="sidebar-container">
        <div className="sidebar" id="summary">
          <div className="sidebar-content" id="biography">
            <Biography 
              firstName={params.firstName} 
              lastName={params.lastName} 
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
              // skills={params.skills}
              skills={['skill1', 'skill2', 'skill3', 'skill1', 'skill2', 'skill3', 'skill1', 'skill2', 'skill3', 'skill1', 'skill2', 'skill3', 'skill1', 'skill2', 'skill3', 'skill1', 'skill2', 'skill3']}
            />
          </div>
        </div>
        <div className="sidebar" id="experience">
          <div className="sidebar-content" id="education">
            <History 
              title={"Education"} 
              array={params.colleges} 
            />
          </div>
          <div className="sidebar-content" id="work">
            <History 
              title={"Experience"} 
              array={params.jobs} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

