<<<<<<< Updated upstream
import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      educationLevel: '',
      courseOfStudy: '',
      phone: ''
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(event) {}

  render() {
    const title = "Campus\nCollaborator";
    return (
      <div className="sign-up-page">
        <div id="border">
          <div id="header">{title}</div>
          <form>
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="text" placeholder="Date of birth" value={this.state.dateOfBirth} onChange={(e) => { this.setState({ dateOfBirth: e.target.value }) }} />
            <input type="text" placeholder="Phone" value={this.state.phone} onChange={(e) => { this.setState({ phone: e.target.value }) }} />
            <input type="text" placeholder="Education level" value={this.state.educationLevel} onChange={(e) => { this.setState({ educationLevel: e.target.value }) }} />
            <input type="text" placeholder="Course of study" value={this.state.courseOfStudy} onChange={(e) => { this.setState({ courseOfStudy: e.target.value }) }} />
            <input type="text" placeholder="Email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
            <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
            <input type="submit" className="submit-button" value="Sign up"/>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp
=======
import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      educationLevel: '',
      courseOfStudy: '',
      phone: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        givenName: this.state.firstName,
        lastName: this.state.lastName,
        dob: this.state.dateOfBirth,
        email: this.state.email,
        password: this.state.password,
        educationLevel: this.state.educationLevel,
        courseOfStudy: this.state.courseOfStudy,
        phone: this.state.phone
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle data
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    const title = "Campus\nCollaborator";
    return (
      <div className="sign-up-page">
        <div id="border">
          <div id="header">{title}</div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-fields">
              <input type="text" placeholder="First name" value={this.state.firstName} onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
              <input type="text" placeholder="Last name" value={this.state.lastName} onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
              <input type="date" placeholder="Date of birth" value={this.state.dateOfBirth} onChange={(e) => { this.setState({ dateOfBirth: e.target.value }) }} />
              <input type="text" placeholder="Phone" value={this.state.phone} onChange={(e) => { this.setState({ phone: e.target.value }) }} />
              <input type="text" placeholder="Education level" value={this.state.educationLevel} onChange={(e) => { this.setState({ educationLevel: e.target.value }) }} />
              <input type="text" placeholder="Course of study" value={this.state.courseOfStudy} onChange={(e) => { this.setState({ courseOfStudy: e.target.value }) }} />
              <input type="text" placeholder="Email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
              <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
            </div>
            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
>>>>>>> Stashed changes
