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