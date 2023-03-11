import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
        this.props.history.push('/profile');
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const title = "Campus\nCollaborator";
    return (
      <div className="sign-in-page">
        <div id="border">
          <div id="header">{title}</div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-fields">
              <input type="text" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              <input type="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <input type="submit" value="Sign in" />
            {/* Forgot password? */}
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn