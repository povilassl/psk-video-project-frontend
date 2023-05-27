import { apiUrl } from "../config";
import axios from "axios";

export async function isUsernameTaken(username) {
    return await axios.get(`${apiUrl}/UserInteractions/CheckIfUsernameTaken?username=${username}`)
}

export async function registerUser(username, email, password, firstName, lastName) {
    let data = {
        username: username,
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    }

    return await axios.post(`${apiUrl}/UserInteractions/RegisterNewUser`, data)
}

export async function loginUser(username, password) {
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    const url = `${apiUrl}/UserInteractions/Login?username=${encodedUsername}&password=${encodedPassword}`;

    return await axios.get(url, { withCredentials: true, credentials: 'include' });
}

export async function changePassword(username, password, newPassword) {
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    const encodedNewPassword = encodeURIComponent(newPassword);
    const url = `${apiUrl}/UserInteractions/ChangePassword?username=${encodedUsername}&password=${encodedPassword}&newPassword=${encodedNewPassword}`;

    return await axios.get(url);
}

export async function logoutUser() {
    return await axios.get(`${apiUrl}/UserInteractions/Logout`, { withCredentials: true, credentials: 'include' })
}

export async function getUserInfo() {
    return await axios.get(`${apiUrl}/UserInteractions/GetUserInfo`, { withCredentials: true, credentials: 'include' })
}

export async function updateUserInfo(username, email, firstName, lastName, updateTime, overwriteChanges = false) {
    let data = {
        username: username,
        emailAddress: email,
        lastInfoUpdateDateTime: updateTime,
        firstName: firstName,
        lastName: lastName
    }
    return await axios.put(`${apiUrl}/UserInteractions/UpdateUserInfo?overwriteChanges=${overwriteChanges}`, data, { withCredentials: true, credentials: 'include' })
}
