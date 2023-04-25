import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Card from 'react-bootstrap/Card';
import './Feed.css';

const Feed = () => {
  const token = window.localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
   if (!token) {
          // Redirect to root directory
          window.location.href = "/";
          return;
        }

    fetch(`http://localhost:8080/api/v1/feed/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProjects(data.projects);
        setUsers(data.users);
      })
      .catch(error => console.log(error));
  }, [token]);

  return (
    <div className="feed-page">
      <Navbar />
      <div className="feed-container">
        <div className="projects">
          <h2>Projects</h2>
          <div className="results">
            {projects.length !== 0 && projects.map(project => (
              <Card style={{ width: '20rem' }} key={project.projectId}>
                <Card.Body>
                  <Card.Title>{project.projectName}</Card.Title>
                  <Card.Subtitle>{project.projectRole}</Card.Subtitle>
                  <Card.Text>
                    {project.projectDescription}
                  </Card.Text>
                  {/* <Card.Link as={Link} state={{  }} to="/profile">View project</Card.Link> */}
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
        <div className="users">
          <h2>Users</h2>
          <div className="results">
            {users.length !== 0 && users.map(user => (
              <Card style={{ width: '15rem' }} key={user.userId}>
                <Card.Body>
                  <Card.Title>{user.givenName} {user.lastName}</Card.Title>
                  <Card.Subtitle>{user.courseOfStudy}</Card.Subtitle>
                  <Card.Link as={Link} state={{ email: user.email }} to="/profile">View profile</Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
