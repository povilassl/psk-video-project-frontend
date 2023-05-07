import { apiUrl } from "../config";
import axios from "axios";

export async function isUsernameTaken(username) {
    return await axios.get(`${apiUrl}/UserInteractions/CheckIfUsernameTaken?username=${username}`)
}

export async function registerUser(username, email, password, firstName, lastName) {
    let data = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    }

    return await axios.post(`${apiUrl}/UserInteractions/RegisterNewUser`, data)
}

export async function loginUser(username, password){
    return await axios.get(`${apiUrl}/UserInteractions/Login?username=${username}&password=${password}`, {withCredentials: true})
}

export async function changePassword(username, password, newPassword){
    return await axios.get(`${apiUrl}/UserInteractions/ChangePassword?username=${username}&password=${password}&newPassword=${newPassword}`)
}