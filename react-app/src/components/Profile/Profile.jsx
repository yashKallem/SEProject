import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'FIRST',
      lastName: 'LAST',
      courseOfStudy: 'Computer Science',
      educationLevel: 'Master\'s',
      email: 'first.last@email.edu',
      phone: '123-456-7890',
      colleges: ['College1', 'College2', 'College1', 'College1', 'College2', 'College1', 'College2'],
      jobs: ['Job1', 'Job2', 'College1', 'College2', 'College1', 'College2', 'College1', 'College2']
    };
  }

//   componentDidMount() {

//   }

  render() {
    return (
      <div className="profile-page">
        <div className="sidebar" id="summary">
          <div id="biography">
            <h2>About</h2>
            <div>{this.state.firstName} {this.state.lastName}</div>
            <div>{this.state.courseOfStudy}</div>
            <div>{this.state.educationLevel}</div>
          </div>
          <div id="contact">
            <h2>Contact Information</h2>
            <div>☻ {this.state.email}</div>
            <div>☻ {this.state.phone}</div>
          </div>
        </div>
        <div className="sidebar" id="experience">
          <div id="education">
            <h2>Education</h2>
            {this.state.colleges.map(college => (
              <div>{college}</div>
            ))}
          </div>
          <div id="work">
            <h2>Work Experience</h2>
            {this.state.jobs.map(job => (
              <div>{job}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile