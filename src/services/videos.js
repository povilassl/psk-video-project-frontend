import { apiUrl } from "./config";
import axios from "axios";

export async function getAllVideos() {
  
    return await axios.get(`${apiUrl}/Videos`)
}

export async function uploadVideo(video) {
    return await axios.post(`${apiUrl}/Videos`, video)
}


// To test if API is working
export async function getTest() {
    
    return await axios.get(`${apiUrl}/Test`)
}