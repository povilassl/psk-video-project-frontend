import { apiUrl } from "./config";
import axios from "axios";

export async function getAllVideos(start = 0, count = 20) {
  return await axios.get(
    `${apiUrl}/Video/GetListOfVideos?startIndex=${start}&endIndex=${count}`
  );
}

export async function uploadVideo(video) {
  return await axios.post(`${apiUrl}/Videos`, video);
}
