<<<<<<< Updated upstream
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

=======
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
      <div className="sign-in-page">
        <div id="border">
          <div id="header">{title}</div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-fields">
              <input type="text" placeholder="Enter your email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
              <input type="password" placeholder="Enter your password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
            </div>
            <input type="submit" value="Sign in" />
            {/* Forgot password? */}
          </form>
        </div>
      </div>
    );
  }
}

>>>>>>> Stashed changes
export default SignIn