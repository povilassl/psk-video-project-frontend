import { apiUrl } from "./config";
import axios from "axios";

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

export async function getCommentReplies(commentId) {
    return await axios.get(`${apiUrl}/VideoInteractions/GetCommentReplies?commentId=${commentId}`)
}

export async function postReplyToComment(commentId, comment, username) {
    let data = {
        commentId: commentId,
        comment: comment,
        username: username
    }

    return await axios.post(`${apiUrl}/VideoInteractions/ReplyToAComment`, data)
}