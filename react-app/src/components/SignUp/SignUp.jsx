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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        givenName: this.state.firstName,
        lastName: this.state.lastName,
        dob: new Date(),
        educationLevel: this.state.educationLevel,
        courseOfStudy: this.state.courseOfStudy,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        role: "USER",
      }),
      headers: {
        Accept: "application/json",
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // setAuthTokens(data);
        this.props.history.push('/profile');
      })
      .catch((err) => {
        console.log(err.message);
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
              <input type="text" placeholder="First name" required name="firstName" value={this.state.firstName} onChange={this.handleChange} />
              <input type="text" placeholder="Last name" required name="lastName" value={this.state.lastName} onChange={this.handleChange} />
              <input type="text" placeholder="Date of birth" required name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} />
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