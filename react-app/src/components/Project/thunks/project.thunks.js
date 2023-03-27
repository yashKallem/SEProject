import * as actions from "../store/action";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'

export const Upemail = () => {

    const dispatch = useDispatch()
    const em = "fhfhf"
    dispatch(actions.OnEmail(em));
}



export const FetchAllProject = async () => {
    const dispatch = useDispatch()
    const location = useLocation();
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


            dispatch(actions.AllProjects(data))
        })
        .catch((error) => console.log(error));

    const d = await fetch("http://localhost:8080/api/v1/projects/all", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${location.state.token}`,
        },
    })
    console.log(d)
}