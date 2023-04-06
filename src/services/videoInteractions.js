import { apiUrl } from "./config";
import axios from "axios";

axios.defaults.headers.post['Content-Type'] = `application/json`;

export async function getVideoComments(videoId) {

    return await axios.get(`${apiUrl}/VideoInteractions/GetVideoComments?videoId=${videoId}`)
}

export async function getVideoCount() {
    return await axios.get(`${apiUrl}/VideoInteractions/GetCountOfAllVideos`)
}

export async function postCommentOnVideo(videoId, comment, username) {
    let data = {
        videoId: videoId,
        comment: comment,
        username: username
    }

    return await axios.post(`${apiUrl}/VideoInteractions/CommentOnAVideo`, data)
}

export async function increaseViewCount(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/IncreaseViewCount`,videoId)
}

export async function addLike(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/AddLike`,videoId)
}

export async function removeLike(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/RemoveLike`,videoId)
}

export async function addDislike(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/AddDislike`,videoId)
}

export async function removeDislike(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/RemoveDislike`,videoId)
}