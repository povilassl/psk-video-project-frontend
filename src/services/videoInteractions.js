import { apiUrl } from "./config";
import axios from "axios";

export async function getVideoComments(videoId) {

    return await axios.get(`${apiUrl}/VideoInteractions/GetVideoComments?videoId=${videoId}`)
}

export async function getVideoCount() {
    return await axios.get(`${apiUrl}/VideoInteractions/GetCountOfAllVideos`)
}

export async function increaseViewCount(videoId) {
    return await axios.post(`${apiUrl}/VideoInteractions/IncreaseViewCount`,videoId, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
}

export async function addLike(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/AddLike`,videoId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

export async function removeLike(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/RemoveLike`,videoId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

export async function addDislike(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/AddDislike`,videoId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

export async function removeDislike(videoId) {
  return await axios.post(`${apiUrl}/VideoInteractions/RemoveDislike`,videoId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
}