export const OnEmail = (email) => {
    return {
        type: "ON_EMAIL",
        payload: email,
    }
}



export const AllProjects = (data) => {

    console.log("actions", data)
    return {
        type: "ON_ALL_PROJECTS",
        payload: data
    }
}