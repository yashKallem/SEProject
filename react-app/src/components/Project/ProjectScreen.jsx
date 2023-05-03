import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/NavBar";
import "../SignUp/SignUp.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getAllProjects } from "../api";
import './Project.css'



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
  const [params, setParams] = useState({
    projectName: "",
    projectDescription: "",
    projectRole: "",
    location: "",
    jobDescription: "",
    deadline: "",
  });


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
          window.location.reload(true)
        })

    }

  }, [postProject]);




  useEffect(() => {

    fetch(getAllProjects(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${location.state.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        setAllProjectsData(data);

        setMyProjectsData(data.filter(x => x.publishedBy.email === location.state.email))
      })
      .catch((error) => console.log(error));

    if (postProject) {
      setPostProject(false)
    }

    if (isUpdateData) {
      setIsUpdateData(false)
    }

  }, [postProject, isUpdateData, isDeleteData]);



  const submitForm = () => {
    setPostProject(true);
  };


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
    window.location.reload(true)

  }
  const data = (data, all) => {

    return (
      <div



        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "20px",
          // fontFamily: 'Helvetica Neue, Arial, sans-serif'
        }}
      >
        {/* //     display: flex;
        //     flex-direction: column;
        //     justify-content: flex-start;
        //     align-items: flex-start;
        //     border: 3px solid;
        //     padding: inherit;
        //     border-radius: inherit;
        //     border-color: #f5f5f5;
        // } */}
        {data.map((ob, index) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",

                border: "solid",
                borderWidth: 3,
                // padding: "inherit",
                borderRadius: 20,
                borderColor: "#f5f5f5",
                padding: 20

                //                borderC
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
                        setIsUpdate={setIsUpdate} updateDataHandler={updateDataHandler} location={location}
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
            <br />
            {/* {data.length !== index + 1 &&
              <hr size="3" width="100%" />
            } */}
          </>
        ))}
      </div >
    );
  };

  // const update = (index, dat) => {
  //   console.log('hfbgfh');
  //   console.log("update data modal", index, dat)
  // };



  const onclickAllProjects = () => {
    if (allProjects) { }
    else {
      setMyProjects(false)
      setAllProjects(true)
    }

  }
  const onclickMyProjects = () => {
    if (myProjects) {

    }
    else {

      setAllProjects(false)
      setMyProjects(true)

    }
  }
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
          backgroundColor: "#f5f5f5",
          // backgroundColor: "hsla(0,0%,100%,.7)",
        }}
      >
        <div
          className="flex:1"
          style={{
            padding: "20px",
            margin: "40px",
            height: "400px",
            border: "1px solid rgba(0, 0, 0, 0.3)",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 3px 10px 0 rgba(0, 0, 0, 0.08)",
            borderRadius: 30,
            flex: 1,
            flexDirection: "column",
            marginBottom: "10px",
            backgroundColor: "white",

          }}
        >
          <Button
            className="buttond"
            style={{
              width: '200px',
              outline: '1px solid #0a66c2',
              color: "#0a66c2"
            }}

            variant="outline" onClick={onclickAllProjects} size="lg">
            view all projects
          </Button>
          <br />
          <br />

          <Button
            className="buttond"
            style={{
              width: '200px',
              outline: '1px solid #0a66c2',
              color: "#0a66c2"

            }}
            variant="outline" size="lg" onClick={onclickMyProjects}>
            view my projects
          </Button>
          <br />
          <br />


          <AddProject data={allProjectsData} handleChange={handleChange} params={params} submitForm={submitForm} />
        </div>
        <div
          className="flex:2"
          style={{
            height: "80%",
            overflowY: "scroll",
            borderRadius: 30,
            margin: "40px",
            flex: 3,
            backgroundColor: "white ",
            border: "1px solid rgba(0, 0, 0, 0.3)",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 3px 10px 0 rgba(0, 0, 0, 0.08)"

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

      </div >
    </>
  );
};

export default ProjectScreen;


const Example = ({ data, index, params, handleChange, submitForm, isUpdate,
  setIsUpdate, updateDataHandler, location }) => {


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



    if (isUpTodate) {

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
          // console.log(data, "after updation");
          setIsUpTOdate(false)
        })
        .catch((error) => console.log(error));


    }
  }, [isUpTodate])


  const [show, setShow] = useState(false);

  const submitUpdateForm = () => {
    setIsUpTOdate(true);
    submitUpdateFormState();

  }

  const submitUpdateFormState = () => {

    console.log(isUpTodate)
    updateDataHandler();

    handleClose()
  }


  const handleUpdateChange = (e) => {

    setD({
      ...d,
      [e.target.name]: e.target.value,
    });

  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalAndForm = () => {
    submitForm()
    alert("Successfully added project")
    handleClose()

  }


  return (
    <>

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

                defaultValue={
                  new Date(d.deadline).toISOString().slice(0, 10)
                  // console.log(new Date(d.deadline).toLocaleDateString("en-CA"))
                  // new Date(d.deadline).toLocaleDateString("en-CA")
                  // console.log("hi", d.deadline, new Date(d.deadline).toLocaleDateString('en-pa'))
                  //                  new Date(d.deadline).toLocaleDateString('en-ca')
                }
                // value={new Date(d.deadline).toLocaleDateString('en-ca')}
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

            Update Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



const AddProject = ({ data, params, handleChange, submitForm }) => {


  const map = () => {

  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalAndForm = () => {
    submitForm()
    handleClose()

  }


  return (
    <>
      <Button
        className="buttond"
        style={{
          width: '200px',
          outline: '1px solid #0a66c2',
          color: "#0a66c2"

        }}
        variant="outline" onClick={handleShow} size="lg">
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
              <Form.Label>Deadline</Form.Label>
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
