import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
//import './Profile.css';
import Button from "react-bootstrap/Button";
import "../SignUp/SignUp.css";

// {
//     "projectId": 1,
//     "projectName": "Project z",
//     "projectDescription": "This project is about developing a new mobile application",
//     "publishedAt": "2023-03-17T10:00:00.000+00:00",
//     "projectRole": "Mobile Developer",
//     "location": "New York",
//     "jobDescription": "We are looking for an experienced mobile developer who can work on both iOS and Android platforms",
//     "publishedBy": {
//         "userId": 1,
//         "givenName": "shamsi",
//         "lastName": "shamsi",
//         "email": "shamsi@wiu.edu",
//         "phone": "1234567890"
//     },
//     "deadline": "2023-04-17T10:00:00.000+00:00"
// }
const data = (data) => {
  console.log("inside project all and my projects", data);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
      }}
    >
      {data.map((ob, index) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p> </p>
          <p> jsgfnsfjgnksfjnksjfsjvnfsnv</p>
          <p> jsgfnv{index}</p>
        </div>
      ))}
    </div>
  );
};
const ProjectScreen = () => {
  const [postProject, setPostProject] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [allProjects, setAllProjects] = useState(true);
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [params, setParams] = useState({
    projectName: "",
    projectDescription: "",
    projectRole: "",
    location: "",
    jobDescription: "",
    deadline: "",
    deadlinedate: "",
  });
  const location = useLocation();
  // const p = () => {
  //     console.log(params)
  // }

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(postProject);
    console.log(params);
    if (postProject) {
      fetch("http://localhost:8080/api/v1/projects/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.token}`,
        },
        body: JSON.stringify({
          projectName: params.projectName,
          projectDescription: params.projectDescription,
          projectRole: params.projectRole,
          location: params.location,
          publishedAt: new Date(),
          jobDescription: params.jobDescription,
          deadline: params.deadline,
          email: `${location.state.email}`,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setPostProject(false);
          setAddProject(false);
        })
        .catch((error) => console.log(error));
    }
  }, [postProject]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/projects/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${location.state.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllProjectsData(data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(allProjectsData, "after update");
  const changeForm = () => {
    setAddProject(true);
  };
  const submitForm = () => {
    setPostProject(true);
  };

  // }
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          height: "100vh",
          overflow: " hidden",
          backgroundColor: "hsla(0,0%,100%,.7)",
        }}
      >
        <div
          className="flex:1"
          style={{
            padding: "20px",
            margin: "40px",
            height: "400px",
            border: "1px solid",
            borderRadius: 20,
            flex: 1,
          }}
        >
          <Button variant="outline-primary" onClick={changeForm} size="lg">
            Block level button
          </Button>

          <Button variant="outline-primary" size="lg">
            Block level button 2
          </Button>
        </div>
        <div
          className="flex:2"
          style={{
            height: "80%",
            overflowY: "scroll",
            border: "1px solid",
            borderRadius: 20,
            margin: "40px",
            flex: 3,
          }}
        >
          <div style={{ padding: "20px" }}>
            {allProjects && allProjectsData.length > 0 ? (
              data(allProjectsData)
            ) : (
              <p> no data available</p>
            )}
            {addProject ? (
              <form>
                <div
                  className="form-fields"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder="project name"
                    required
                    name="projectName"
                    value={params.projectName}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="textarea"
                    placeholder="project description"
                    required
                    name="projectDescription"
                    value={params.projectDescription}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="location"
                    required
                    name="location"
                    value={params.location}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="job description"
                    required
                    name="jobDescription"
                    value={params.jobDescription}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="project role"
                    required
                    name="projectRole"
                    value={params.projectRole}
                    onChange={handleChange}
                  />
                  <br />
                  {/* <input type="date" required name="Deadline" value={params.deadline} onChange={handleChange} /> */}
                  <input
                    type="date"
                    onChange={(event) =>
                      setParams({ ...params, deadline: event.target.value })
                    }
                  />
                  <br />
                  <input
                    type="button"
                    value="Add Project"
                    onClick={submitForm}
                  />
                </div>
              </form>
            ) : null}
          </div>
        </div>
        {/* <div
          className="flex:3"
          style={{
            height: "400px",
            border: "1px solid",
            borderRadius: 20,
            margin: "40px",
            flex: 2,
            padding: "20px",
          }}
        >
          <p></p>
        </div> */}
      </div>
    </>
  );
};

export default ProjectScreen;

const styles = {
  profile: {
    flex: 1,
    flexDirection: "row",
  },
};
