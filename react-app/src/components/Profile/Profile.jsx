import React, { Component } from 'react';
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
      skills: ['skill1', 'skill2', 'skill1'],
      colleges: ['College1', 'College2', 'College1', 'College1', 'College2', 'College1', 'College2'],
      jobs: ['Job1', 'Job2', 'College1', 'College2', 'College1', 'College2', 'College1', 'College2']
    };
  }

  // componentDidMount() {
  //   const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZUB0ZXN0LmVkd…Dg0fQ.ABAVBtssY-GvHcpHEQvw4VnI5ZAQ53VZJ1oTN20LFuM";
  //   fetch("http://localhost:8080/users/profile/alice@test.edu", {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  // 
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  render() {
    return (
      <div className="profile-page">
        {/* NAVBAR */}
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
      </div>
    );
  }
}

export default Profile