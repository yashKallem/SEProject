import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {email: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
      }
    
      render() {
        const title = "Campus\nCollaborator";
        return (
          <div className="sign-in-border">
          <header className="sign-in-header">
            {title}
          </header>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input className="email-field" type="text" placeholder="Enter your email" value={this.state.email} onChange={this.handleChange}/>
            </label>
            <input className="submit-button" type="submit" value="Sign in"/>
          </form>
          </div>
        );
      }
}

export default SignIn