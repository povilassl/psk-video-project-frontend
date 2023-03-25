import { apiUrl } from "./config";
import axios from "axios";

export async function getAllVideos() {
  
    const response = 
        await axios.get(`${apiUrl}videos`)
        .then((response) => { console.log(response); })
        .catch((error) => { console.log(error); })

    return response.json();
}

export async function getTest() {
    
    return await axios.get(`${apiUrl}Test`)
}