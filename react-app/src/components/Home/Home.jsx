import './Home.css';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import collaborators from '../../collaborators.png';

class Home extends Component {
  render() {
    const title = "Campus\nCollaborator";
    return (
      <div className="home-page">
        <header>{title}</header>
        <div className="button-container">
          <Link to="/signin">
            <button id="sign-in">Sign in</button>
          </Link>
          <Link to="/signup">
            <button id="sign-up">Create an account</button>
          </Link>
        </div>
        <div className="img-container">
          <img src={collaborators} alt="collaborators" />
        </div>
      </div>
    );
  }
}

export default Home;