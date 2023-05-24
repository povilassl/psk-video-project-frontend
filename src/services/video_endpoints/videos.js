import { apiUrl } from "../config";
import axios from "axios";

export async function getAllVideos(start = 0, count = 20) {
  return await axios.get(
    `${apiUrl}/Video/GetListOfVideos?startIndex=${start}&count=${count}`
  );
}

export async function uploadVideo(videoName, description, videoFile, thumbnailImage, sendEmail=false) {
  const formData = new FormData();
  formData.append('VideoName', videoName);
  formData.append('Description', description);
  formData.append('VideoFile', videoFile);
  formData.append('ThumbnailImage', thumbnailImage);
  formData.append('sendEmail', sendEmail);

  return await axios.post(`${apiUrl}/Video/UploadVideo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
