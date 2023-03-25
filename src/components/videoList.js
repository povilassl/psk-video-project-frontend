import { getAllVideos } from "../services/videos";
import React, { useState, useEffect } from 'react';
import { Video } from "./video";

export const VideoList = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        getAllVideos().then((videos) => setVideos(videos))
    }, [])

    return (
        <div>
            <h1>Video List</h1>
            {
                videos.map((video) => (<Video key={video.id} video={video} />))
            }
        </div>
    );
}