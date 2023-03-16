import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [params, setParams] = useState({
    email: '',
    password: '',
    status: '',
    token: ''
  });

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setParams({
          // email: '',
          ...params,
          password: '',
          token: data.token,
          status: data.httpStatus
        });
      })
      .catch(error => console.error(error));
  }

  const title = "Campus\nCollaborator";
  return (
    <div className="sign-in-page">
      <div id="border">
        <div id="header">{title}</div>
        <form onSubmit={handleSubmit}>
          {(() => {
            if (params.status === "OK") {
              return (
                <Navigate to="/feed" state={{ token: params.token, email: params.email }} replace={true} />
              )
            } else if (params.status === "UNAUTHORIZED") {
              return (
                <div className="error-message">Incorrect username or password</div>
              )
            } else if (params.status === "INTERNAL_SERVER_ERROR") {
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
            <input type="text" placeholder="Enter your email" name="email" value={params.email} onChange={handleChange} />
            <input type="password" placeholder="Enter your password" name="password" value={params.password} onChange={handleChange} />
          </div>
          <input type="submit" value="Sign in" />
        </form>
      </div>
    </div>
  );
}

export default SignIn