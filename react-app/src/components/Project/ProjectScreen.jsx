import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
//import './Profile.css';
import "../SignUp/SignUp.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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
  });
  const location = useLocation();
  // const p = () => {
  //     console.log(params)
  // }

  const handleChange = (e) => {
    //    console.log(params);
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });


    //    console.log(params);
  };


  useEffect(() => {
    console.log(postProject);
    console.log(params, "useEffect");
    if (postProject) {
      console.log(params, "useeffect post");
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
          console.log(data, "after updation");
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

  const data = (data) => {
    //    console.log("inside project all and my projects", data, params);

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
            <p>
              <Example data={data[index]} index={index} handleChange={handleChange} params={params} submitForm={submitForm} />
            </p>
          </div>
        ))}
      </div>
    );
  };

  const update = (index, dat) => {
    console.log('hfbgfh');
    console.log("update data modal", index, dat)
  };
  // }
  return (
    <>
      <Navbar />
      {/* <Example /> */}
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
              <>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="project name"
                      required
                      name="projectName"
                      value={params.projectName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="textarea"
                      placeholder="project description"
                      required
                      name="projectDescription"
                      value={params.projectDescription}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="location"
                      required
                      name="location"
                      value={params.location}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="job description"
                      required
                      name="jobDescription"
                      value={params.jobDescription}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="project role"
                      required
                      name="projectRole"
                      value={params.projectRole}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="date"
                      name="deadline"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="secondary" onClick={submitForm}>
                    "Add Project"
                  </Button>
                </Form>
                {/* <form>
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
                </form> */}
              </>
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

const Example = ({ data, index, params, handleChange, submitForm }) => {

  //  console.log("exaple,", params)
  const map = () => {

  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalAndForm = () => {
    submitForm()
    alert("Successfully added project")
    handleClose()

  }
  //  console.log("inside after on click show modal this one", data, index)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="project name"
                required
                name="projectName"
                value={params.projectName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>project description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="project description"
                required
                name="projectDescription"
                value={params.projectDescription}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="location"
                required
                name="location"
                value={params.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="job description"
                required
                name="jobDescription"
                value={params.jobDescription}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Project Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="project role"
                required
                name="projectRole"
                value={params.projectRole}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                onChange={handleChange}
              />
            </Form.Group>

          </Form>

        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >

          <Button variant="primary" onClick={handleModalAndForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
