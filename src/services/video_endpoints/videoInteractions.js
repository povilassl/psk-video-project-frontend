import { apiUrl } from "../config";
import axios from "axios";

axios.defaults.headers.post['Content-Type'] = `application/json`;
axios.defaults.withCredentials = true;

export async function getVideoComments(videoId) {

    return await axios.get(`${apiUrl}/VideoInteractions/GetVideoComments?videoId=${videoId}`)
}

export async function getVideoCount() {
    return await axios.get(`${apiUrl}/VideoInteractions/GetCountOfAllVideos`)
}

export async function postCommentOnVideo(videoId, comment) {
    let data = {
        videoId: videoId,
        comment: comment
    }

    return await axios.post(`${apiUrl}/VideoInteractions/CommentOnAVideo`, data, { withCredentials: true, credentials: 'include' })
}

export async function increaseViewCount(videoId) {
    return await axios.get(`${apiUrl}/VideoInteractions/IncreaseViewCount?videoId=${videoId}`)
}

export async function addLike(videoId) {
    return await axios.post(`${apiUrl}/VideoInteractions/AddLike?videoId=${videoId}`, { withCredentials: true, credentials: 'include' })
}

export async function removeLike(videoId) {
    return await axios.post(`${apiUrl}/VideoInteractions/RemoveLike?videoId=${videoId}`, { withCredentials: true, credentials: 'include' })
}

export async function addDislike(videoId) {
    return await axios.post(`${apiUrl}/VideoInteractions/AddDislike?videoId=${videoId}`, { withCredentials: true, credentials: 'include' })
}

export async function removeDislike(videoId) {
    return await axios.post(`${apiUrl}/VideoInteractions/RemoveDislike?videoId=${videoId}`, { withCredentials: true, credentials: 'include' })
}

export async function getCommentReplies(commentId) {
    return await axios.get(`${apiUrl}/VideoInteractions/GetCommentReplies?commentId=${commentId}`)
}

export async function postReplyToComment(commentId, comment, username) {
    let data = {
        commentId: commentId,
        comment: comment
    }

    return await axios.post(`${apiUrl}/VideoInteractions/ReplyToAComment`, data, { withCredentials: true, credentials: 'include' })
}

export async function getVideoReaction(videoId) {
    return await axios.get(`${apiUrl}/VideoInteractions/GetVideoReaction?videoId=${videoId}`)
}