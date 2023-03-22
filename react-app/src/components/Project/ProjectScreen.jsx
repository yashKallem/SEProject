import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
//import './Profile.css';
import Button from 'react-bootstrap/Button';
import "../SignUp/SignUp.css"


const ProjectScreen = () => {

    const [postProject, setPostProject] = useState(false)
    const [addProject, setAddProject] = useState(false);
    const [params, setParams] = useState({
        projectName: "",
        projectDescription: "",
        projectRole: "",
        location: "",
        jobDescription: "",
        deadline: "",
        deadlinedate: "text"
    }
    );

    const location = useLocation();

    const p = () => {
        console.log(params)
    }

    const handleChange = (e) => {
        setParams({
            ...params,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        console.log(postProject);
        console.log(params)
        if (postProject) {
            fetch("http://localhost:8080/api/v1/projects/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${location.state.token}`
                },
                body: JSON.stringify(
                    {
                        "projectName": params.projectName,
                        "projectDescription": params.projectDescription,
                        "projectRole": params.projectRole,
                        "location": params.location,
                        "publishedAt": new Date(),
                        "jobDescription": params.jobDescription,
                        "deadline": params.deadline,
                        "email": `${location.state.email}`
                        // 
                        // 
                        // projectName: "d",
                        // projectDescription: "d",
                        // projectRole: "d",
                        // location: "d",
                        // publishedAt: new Date(),
                        // jobDescription: "d",
                        // deadline: new Date(),
                        // email: "shamsi@wiu.edu"
                    }
                )
            })
                .then(response => {

                    return response.json();
                }).then(data => {
                    console.log(data)
                    setPostProject(false)
                    setAddProject(false)
                })
                .catch(error => console.log(error));
        }
    }, [postProject]);

    const changeForm = () => {
        setAddProject(true)

    }
    const submitForm = () => {
        setPostProject(true)
    }


    const handleFocus = () => {
        setParams({
            ...params,
            deadlinedate: 'date'
        })
    }

    const handleBlur = () => {
        if (params.deadline === '') {
            setParams({
                ...params,
                deadlinedate: 'text'
            })
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
                    // alignItems: "center",
                    height: "100vh",
                    overflow: " hidden",
                    // margin: "20px"
                }}
            >
                <div
                    className="flex:1"
                    style={{ padding: "20px", margin: "40px", height: "400px", border: '1px solid', borderRadius: 20, flex: 2 }}>

                    <Button variant="outline-primary"
                        onClick={changeForm}
                        size="lg">
                        Block level button
                    </Button>


                </div>
                <div
                    className="flex:2"
                    style={{
                        height: "80%", /* subtract height of other boxes and margin */
                        overflowY: "scroll",
                        border: '1px solid', borderRadius: 20, margin: "40px", flex: 3
                    }}
                >
                    <div style={{ padding: "20px" }}>

                        {/* <FormPost /> */}



                        {addProject ? (

                            <form >
                                <div className="form-fields"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}
                                >
                                    <input type="text" placeholder="project name" required name="projectName" value={params.projectName} onChange={handleChange} />
                                    <br />
                                    <input type="textarea" placeholder="project description" required name="projectDescription" value={params.projectDescription} onChange={handleChange} />
                                    <br />
                                    <input type="text" placeholder="location" required name="location" value={params.location} onChange={handleChange} />
                                    <br />
                                    <input type="text" placeholder="job description" required name="jobDescription" value={params.jobDescription} onChange={handleChange} />
                                    <br />
                                    <input type="text" placeholder="project role" required name="projectRole" value={params.projectRole} onChange={handleChange} />
                                    <br />
                                    {/* <input type="date" required name="Deadline" value={params.deadline} onChange={handleChange} /> */}
                                    <input type="date" onChange={(event) => setParams({ ...params, deadline: event.target.value })} />
                                    <br />
                                    <input type="button" value="Add Project" onClick={submitForm} />
                                </div >
                            </form>) : (null)

                        }
                        {/* {addProject == true &&
                            <form >
                                <input type="text" placeholder="project name" required name="projectName" value={params.projectName} onChange={handleChange} />
                                <input type="text" placeholder="project description" required name="projectDescription" value={params.projectDescription} onChange={handleChange} />
                                <input type="text" placeholder="location" required name="location" value={params.location} onChange={handleChange} />
                                <input type="text" placeholder="job description" required name="jobDescription" value={params.jobDescription} onChange={handleChange} />
                                <input type="text" placeholder="project role" required name="projectRole" value={params.projectRole} onChange={handleChange} />
                                <br />
                                <input type="button" value="Add Project" onClick={setPostProject(true)} />

                            </form>
                        } */}

                    </div>
                </div>
                <div
                    className="flex:3"
                    style={{ height: "400px", border: '1px solid', borderRadius: 20, margin: "40px", flex: 2, padding: "20px" }}>

                    <p>

                    </p>
                </div>
            </div>
        </>
    );

}

export default ProjectScreen;




const styles = {
    profile: {
        flex: 1,
        flexDirection: "row",

    }
}