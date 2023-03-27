import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import Biography from "./Biography/Biography";
import Contact from "./Contact/Contact";
import History from "./History/History";
import "./Profile.css";

const Profile = () => {
  const [params, setParams] = useState({
    firstName: "",
    lastName: "",
    courseOfStudy: "",
    educationLevel: "",
    email: "",
    phone: "",
    skills: [],
    colleges: [],
    jobs: [],
  });

  const location = useLocation();
  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/users/profile?email=${location.state.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
          jobs: data.workHistory,
        });
      })
      .catch((error) => console.log(error));
  }, [location]);

  return (
    <div className="profile-page">
      <Navbar />
      <div className="sidebar-container">
        <div className="sidebar" id="summary">
          <div className="sidebar-content" id="biography">
            <h2>About</h2>
            <div>
              {params.firstName} {params.lastName}
            </div>
            <div>{params.courseOfStudy}</div>
            <div>{params.educationLevel}</div>
          </div>
          <div className="sidebar-content" id="contact">
            <h2>Contact Information</h2>
            <div>{params.email}</div>
            <div>{params.phone}</div>
          </div>
          <div className="sidebar-content" id="skills">
            <h2>Skills</h2>
            <div>{params.skills.join(", ")}</div>
          </div>
        </div>
        <div className="sidebar" id="experience">
          <div className="sidebar-content" id="education">
            <h2>Education</h2>
            <div className="table">
              {params.colleges.map((college) => (
                <div className="row">
                  <div className="col">{college[0]}</div>
                  <div className="col">{college[1]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="sidebar-content" id="work">
            <h2>Work Experience</h2>
            <div className="table">
              {params.jobs.map((job) => (
                <div className="row">
                  <div className="col">{job[0]}</div>
                  <div className="col">{job[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
