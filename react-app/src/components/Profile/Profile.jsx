import React, { Component } from 'react';
import Navbar from '../NavBar/NavBar';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'First',
      lastName: 'Last',
      courseOfStudy: 'Computer Science',
      educationLevel: 'Master\'s',
      email: 'first.last@email.edu',
      phone: '123-456-7890',
      skills: ['Skill', 'Skill', 'Skill'],
      colleges: [['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year'], ['College', 'Year']],
      jobs: [['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year'], ['Job', 'Year']]
    };
  }

  componentDidMount() {
   // const token = localStorage.getItem('token');
    const email = "shamsi@wiu.edu";
    const url = `http://localhost:8080/api/v1/users/profile?email=${email}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGFtc2lAd2l1LmVkdSIsImlhdCI6MTY3ODk1MDk3OSwiZXhwIjoxNjc4OTUyNDE5fQ.Q1s088Zk4dL18VqspojFF6EmY8k3W8GuCPx4QjQ8lu4`
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      // handle the error
    });
  }

  render() {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="sidebar-container">
          <div className="sidebar" id="summary">
            <div id="biography">
              <h2>About</h2>
              <div>{this.state.firstName} {this.state.lastName}</div>
              <div>{this.state.courseOfStudy}</div>
              <div>{this.state.educationLevel}</div>
            </div>
            <div id="contact">
              <h2>Contact Information</h2>
              <div>{this.state.email}</div>
              <div>{this.state.phone}</div>
            </div>
            <div id="skills">
              <h2>Skills</h2>
              <div>
                {this.state.skills.join(', ')}
              </div>
            </div>
          </div>
          <div className="sidebar" id="experience">
            <div id="education">
              <h2>Education</h2>
              <div className="table">
                {this.state.colleges.map(college => (
                  <div className="row">
                    <div className="col">{college[0]}</div>
                    <div className="col">{college[1]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div id="work">
              <h2>Work Experience</h2>
              <div className="table">
                {this.state.jobs.map(job => (
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
  }
}

export default Profile;

