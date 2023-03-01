import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  }

  render() {
    const title = "Campus\nCollaborator";
    return (
      <div className="sign-in-border">
        <div className="sign-in-header">{title}</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter your email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
          <input type="password" placeholder="Enter your password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
          <input className="submit-button" type="submit" value="Sign in" />
          {/* Forgot password? */}
        </form>
      </div>
    );
  }
}

export default SignIn