import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
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
      phone: '',
      dobInputType: 'text',
      status: '',
      token: ''
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFocus() {
    this.setState({
      dobInputType: 'date'
    })
  }

  handleBlur() {
    if (this.state.dateOfBirth === '') {
      this.setState({
        dobInputType: 'text'
      })
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
        // console.log(data);
        this.setState({
          token: data.token,
          status: data.httpStatus
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const title = "Campus\nCollaborator";
    return (
      <div className="sign-up-page">
        <div id="border">
          <div id="header">{title}</div>
          <form onSubmit={this.handleSubmit}>
            {(() => {
              if (this.state.status === "OK") {
                return (
                  <Navigate to="/feed" state={{ token: this.state.token, email: this.state.email }} replace={true} />
                )
              } else if (this.state.status === "CONFLICT") {
                return (
                  <div className="error-message">Account already exists</div>
                )
              } else if (this.state.status === "INTERNAL_SERVER_ERROR") {
                return (
                  <div className="error-message">Something went wrong. Please try again later</div>
                )
              } else {
                return (
                  <div>&nbsp;</div>
                )
              }
            })()}
            <div className="form-fields">
              <input type="text" placeholder="First name" required name="firstName" value={this.state.firstName} onChange={this.handleChange} />
              <input type="text" placeholder="Last name" required name="lastName" value={this.state.lastName} onChange={this.handleChange} />
              <input type={this.state.dobInputType} placeholder="Date of birth" onFocus={this.handleFocus} onBlur={this.handleBlur} required name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} />
              <input type="text" placeholder="Phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
              <input type="text" placeholder="Education level" required name="educationLevel" value={this.state.educationLevel} onChange={this.handleChange} />
              <input type="text" placeholder="Course of study" required name="courseOfStudy" value={this.state.courseOfStudy} onChange={this.handleChange} />
              <input type="text" placeholder="Email" required name="email" value={this.state.email} onChange={this.handleChange} />
              <input type="password" placeholder="Password" required name="password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp