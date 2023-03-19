import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
//import './Profile.css';


const ProjectScreen = () => {

    console.log(Date.now())
    const [params, setParams] = useState({
        projectName: "d",
        projectDescription: "d",
        projectRole: "d",
        location: "d",
        publishedAt: new Date(),
        jobDescription: "d",
        deadline: new Date(),
        email: "d"
    }
    );
    const [a, setA] = useState(false)
    const location = useLocation();
    console.log(location.state)
    // const OnAdd = () => {
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/projects/add", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${location.state.token}`
            },
            body: JSON.stringify({
                // "projectName": params.projectName,
                // "projectDescription": "This project is about developing a new mobile application",
                // "projectRole": "Mobile Developer",
                // "location": "New York yash",
                // "publishedAt": "2023-03-17T10:00:00.000Z",
                // "jobDescription": "We are looking for an experienced mobile developer who can work on both iOS and Android platforms",
                // "deadline": "2023-04-17T10:00:00.000Z",
                // "email": "shamsi@wiu.edu"


                projectName: "d",
                projectDescription: "d",
                projectRole: "d",
                location: "d",
                publishedAt: new Date(),
                jobDescription: "d",
                deadline: new Date(),
                email: "shamsi@wiu.edu"
            }
            )
        })
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)
            })
            .catch(error => console.log(error));
    }, [a]);
    // }
    return (






        <>
            <p onClick={() => setA(!a)}>djfbg</p>
            {/* <div style={styles.profile
            } >

                <div style={{ display: "flex", flex: 1, height: "100%", width: "100%", backgroundColor: "black" }}></div>
                <div style={{ display: "flex", flex: 1, height: "100%", width: "100%", backgroundColor: "white" }}></div>
            </div>
 */}










            <Navbar />
            <div className="profile-page">

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