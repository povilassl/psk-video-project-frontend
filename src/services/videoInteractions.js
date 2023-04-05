import { apiUrl } from "./config";
import axios from "axios";

export async function getVideoComments(videoId) {

    return await axios.get(`${apiUrl}/VideoInteractions/GetVideoComments?videoId=${videoId}`)
}

export async function getVideoCount() {
    return await axios.get(`${apiUrl}/VideoInteractions/GetCountOfAllVideos`)
}