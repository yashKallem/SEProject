import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
//import './Profile.css';
import "../SignUp/SignUp.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectScreen = () => {
  const token = window.localStorage.getItem("token");
  const location = { state: { email: window.localStorage.getItem("email"), token: window.localStorage.getItem("token") } }
  const [postProject, setPostProject] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [allProjects, setAllProjects] = useState(true);
  const [myProjects, setMyProjects] = useState(false);
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [myProjectsData, setMyProjectsData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false)
  const [indexupdate, setIndexUpdate] = useState(null)
  const [Delete, setDelete] = useState(false)
  const [params, setParams] = useState({
    projectName: "",
    projectDescription: "",
    projectRole: "",
    location: "",
    jobDescription: "",
    deadline: "",
  });
  // const location = useLocation();

  const [isUpdateData, setIsUpdateData] = useState(false)
  const [isDeleteData, setIsDeleteData] = useState(false)

  const updateDataHandler = () => {
    setIsUpdateData(true);
  }
  const handleChange = (e) => {

    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });



  };


  useEffect(() => {
   if (!token) {
          // Redirect to root directory
          window.location.href = "/";
          return;
        }

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

          setPostProject(false);
          setAddProject(false);
        })

    }
  }, [postProject]);




  useEffect(() => {
    console.log("changes whe update")
    console.log(location.state.token, "token")
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
        // console.log(data);
        setAllProjectsData(data);
        setMyProjectsData(data.filter(x => x.publishedBy.email == location.state.email))
      })
      .catch((error) => console.log(error));

    if (postProject) {
      setPostProject(false)
    }

    if (isUpdateData) {
      setIsUpdateData(false)
    }

  }, [postProject, isUpdateData, isDeleteData]);


  const changeForm = () => {
    setAddProject(true);
  };
  const submitForm = () => {
    setPostProject(true);
  };
  const submitUpdateForm = () => {
    setIsUpdate(true)
  }

  const deleteData = (id) => {
    fetch("http://localhost:8080/api/v1/projects/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${location.state.token}`,
      },
      body: JSON.stringify({
        projectId: id,
        email: `${location.state.email}`,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsDeleteData(true);
      })

  }
  const data = (data, all) => {

    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        {data.map((ob, index) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <div style={styles.dataRow}>

                <p style={styles.textBold}>{ob.projectName}      </p>
                {all &&
                  <>
                    <p style={{
                      paddingLeft: 30
                    }}>
                      <Example data={data[index]} index={index} handleChange={handleChange} params={params} submitForm={submitForm} isUpdate={isUpdate}
                        setIsUpdate={setIsUpdate} updateDataHandler={updateDataHandler}
                      />
                    </p>


                    <p style={{ paddingLeft: 20 }}>   <FaTrash onClick={() => deleteData(ob.projectId)} />
                    </p>
                  </>
                }
              </div>

              <div style={styles.dataRow}>

                <p> {ob.projectRole}</p>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column"
              }}>


                <p style={{ textAlign: "left" }}>{ob.projectDescription} </p>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column"
              }}>


                <p style={{ textAlign: "left" }}> {ob.jobDescription}</p>
              </div>

            </div>
            {data.length != index + 1 &&
              <hr size="3" width="100%" />
            }
          </>
        ))}
      </div>
    );
  };

  const update = (index, dat) => {
    console.log('hfbgfh');
    console.log("update data modal", index, dat)
  };



  const onclickAllProjects = () => {
    if (allProjects) { }
    else {
      console.log(allProjectsData)
      setMyProjects(false)
      setAllProjects(true)
    }

  }
  const onclickMyProjects = () => {
    if (myProjects) {
      console.log("my pro false")
    }
    else {
      console.log("my pro")
      setAllProjects(false)
      setMyProjects(true)

    }
  }
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
            //            color: "grey",
            borderColor: "blue",
            flexDirection: "column",
            marginBottom: "10px"
          }}
        >
          <Button variant="outline-primary" onClick={onclickAllProjects} size="lg">
            view all projects
          </Button>
          <br />
          <Button variant="outline-primary" size="lg" onClick={onclickMyProjects}>
            view my projects
          </Button>
          <br />


          <AddProject data={allProjectsData} handleChange={handleChange} params={params} submitForm={submitForm} />
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
            {allProjects ?
              (allProjectsData.length > 0 ? (
                data(allProjectsData, false)
              ) : (
                <p> no data available</p>
              )) : <></>}
            {myProjects ?
              (myProjectsData.length > 0 ? (
                data(myProjectsData, true)
              ) : (
                <p> no data available</p>
              )) : <></>}
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


const Example = ({ data, index, params, handleChange, submitForm, isUpdate,
  setIsUpdate, updateDataHandler }) => {

  const location = useLocation();
  //  console.log(data)
  // console.log("update")
  const [d, setD] = useState({
    projectName: data.projectName,
    projectDescription: data.projectDescription,
    projectRole: data.projectRole,
    location: data.location,
    jobDescription: data.jobDescription,
    deadline: data.deadline,
  })
  const [isUpTodate, setIsUpTOdate] = useState(false)



  useEffect(() => {

    console.log("is update enterd", isUpTodate)
    console.log("token", location.state.token)

    if (isUpTodate) {
      console.log("is update enterd")
      fetch("http://localhost:8080/api/v1/projects/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.token}`,
        },
        body: JSON.stringify({
          projectId: data.projectId,
          projectName: d.projectName,
          projectDescription: d.projectDescription,
          projectRole: d.projectRole,
          location: d.location,
          publishedAt: new Date(),
          jobDescription: d.jobDescription,
          deadline: d.deadline,
          email: `${location.state.email}`,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data, "after updation");
          setIsUpTOdate(false)
        })
        .catch((error) => console.log(error));


    }
  }, [isUpTodate])
  // console.log(d)

  const [show, setShow] = useState(false);

  const submitUpdateForm = () => {
    setIsUpTOdate(true);
    submitUpdateFormState();
    // console.log(isUpTodate)
    // updateDataHandler();
    // setIsUpTOdate(false)
    // handleClose()
  }

  const submitUpdateFormState = () => {
    // setIsUpTOdate(true)
    console.log(isUpTodate)
    updateDataHandler();

    handleClose()
  }


  const handleUpdateChange = (e) => {
    // console.log(e);
    setD({
      ...d,
      [e.target.name]: e.target.value,
    });
    // console.log(d[e.target.name])
  }
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
      {/* <Button variant="primary" onClick={handleShow}>
        +
      </Button> */}

      <FaEdit onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
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
                value={d.projectName}
                onChange={handleUpdateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>project description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="project description"
                required
                name="projectDescription"
                value={d.projectDescription}
                onChange={handleUpdateChange}
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
                value={d.location}
                onChange={handleUpdateChange}
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
                value={d.jobDescription}
                onChange={handleUpdateChange}
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
                value={d.projectRole}
                onChange={handleUpdateChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Apply by</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                defaultValue={new Date(d.deadline).toLocaleDateString('en-CA')}
                //                value={(d.deadline).toLocaleDateString('en-CA')}
                onChange={handleUpdateChange}
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

          <Button variant="primary" onClick={submitUpdateForm} >
            {/* //onClick={handleModalAndForm}> */}
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



const AddProject = ({ data, params, handleChange, submitForm }) => {

  //  console.log("exaple,", params)
  const map = () => {

  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalAndForm = () => {
    submitForm()
    handleClose()

  }
  //  console.log("inside after on click show modal this one", data, index)

  return (
    <>
      <Button
        variant="outline-primary" onClick={handleShow} size="lg">
        Add Project
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
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
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const styles = {
  profile: {
    flex: 1,
    flexDirection: "row",
  },

  textBold: {
    fontWeight: "600"
  },

  dataRow: {
    display: "flex",
    flexDirection: "row"
  }
};
