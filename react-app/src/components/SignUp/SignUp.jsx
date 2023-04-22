import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [params, setParams] = useState({
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
  });

  const handleFocus = () => {
    setParams({
      ...params,
      dobInputType: 'date'
    })
  }

  const handleBlur = () => {
    if (params.dateOfBirth === '') {
      setParams({
        ...params,
        dobInputType: 'text'
      })
    }
  }

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        givenName: params.firstName,
        lastName: params.lastName,
        dob: params.dateOfBirth,
        email: params.email,
        password: params.password,
        educationLevel: params.educationLevel,
        courseOfStudy: params.courseOfStudy,
        phone: params.phone
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("email", params.email);

        setParams({
          ...params,
          status: data.httpStatus
        });
      })
      .catch(error => console.error(error));
  }

  const title = "Campus\nCollaborator";
  return (
    <div className="sign-up-page">
      <div id="border">
        <div id="header">{title}</div>
        <form onSubmit={handleSubmit}>
          {(() => {
            if (params.status === "OK") {
              return (
                <Navigate to="/feed" state={{ email: params.email }} replace={true} />
              )
            } else if (params.status === "CONFLICT") {
              return (
                <div className="error-message">An account with this email address already exists.</div>
              )
            } else if (params.status === "INTERNAL_SERVER_ERROR") {
              return (
                <div className="error-message">Something went wrong. Please try again later.</div>
              )
            } else {
              return (
                <div>&nbsp;</div>
              )
            }
          })()}
          <div className="form-fields">
            <input type="text" placeholder="First name" required name="firstName" value={params.firstName} onChange={handleChange} />
            <input type="text" placeholder="Last name" required name="lastName" value={params.lastName} onChange={handleChange} />
            <input type={params.dobInputType} placeholder="Date of birth" onFocus={handleFocus} onBlur={handleBlur} required name="dateOfBirth" value={params.dateOfBirth} onChange={handleChange} />
            <input type="text" placeholder="Phone" name="phone" value={params.phone} onChange={handleChange} />
            <input type="text" placeholder="Education level" required name="educationLevel" value={params.educationLevel} onChange={handleChange} />
            <input type="text" placeholder="Course of study" required name="courseOfStudy" value={params.courseOfStudy} onChange={handleChange} />
            <input type="text" placeholder="Email" required name="email" value={params.email} onChange={handleChange} />
            <input type="password" placeholder="Password" required name="password" value={params.password} onChange={handleChange} />
          </div>
          <input type="submit" value="Sign up" />
        </form>
      </div>
    </div>
  );
}

export default SignUp