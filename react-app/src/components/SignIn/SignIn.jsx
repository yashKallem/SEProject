import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: '',
      token: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8080/api/v1/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          // email: '',
          password: '',
          token: data.token,
          status: data.httpStatus
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const title = "Campus\nCollaborator";
    return (
      <div className="sign-in-page">
        <div id="border">
          <div id="header">{title}</div>
          <form onSubmit={this.handleSubmit}>
            {(() => {
              if (this.state.status === "OK") {
                return (
                  <Navigate to="/feed" state={{ token: this.state.token, email: this.state.email }} replace={true} />
                )
              } else if (this.state.status === "UNAUTHORIZED") {
                return (
                  <div className="error-message">Incorrect username or password</div>
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
              <input type="text" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              <input type="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <input type="submit" value="Sign in" />
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn