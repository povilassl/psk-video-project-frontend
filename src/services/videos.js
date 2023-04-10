import { apiUrl } from "./config";
import axios from "axios";

export async function getAllVideos(start = 0, count = 20) {
  return await axios.get(
    `${apiUrl}/Video/GetListOfVideos?startIndex=${start}&count=${count}`
  );
}

export async function uploadVideo(videoName, username, description, videoFile, thumbnailImage) {
  const formData = new FormData();
  formData.append('VideoName', videoName);
  formData.append('Username', username);
  formData.append('Description', description);
  formData.append('VideoFile', videoFile);
  formData.append('ThumbnailImage', thumbnailImage);

  return await axios.post(`${apiUrl}/Video/UploadVideo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
