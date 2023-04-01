import { getAllVideos } from "../services/videos";
import React, { useState, useEffect } from 'react';
import { Video } from "./video";

export const VideoList = () => {

    /* Container for videos in various fetch states */
    let container = () => {
        if (videos.state === 'fetching') {
            return <p className="fetch_loading">Loading...</p>;
        }
    
        else if (videos.state === 'failed') {
            return <p className="fetch_failed">Failed to fetch data.</p>;
        }
        else if (videos.state === 'fetched') {
            return (
                <div className="videos_fetched_container">
                    {videos.data.map((item) => (
                        <Video key={item.id} video={item} />
                    ))}
                </div>
            );
        }
    }

    /* Fetching videos */
    const [videos, setVideos] = useState(
        {
            state: null,
            data: null
        }
    );

    useEffect(() => {
        // to not fetch videos again if they are already fetched
        if (!videos.data) {
            setVideos({ ...videos, state: "fetching" })
            getAllVideos()
                .then((response) => { setVideos({ state: "fetched", data: response.data }) })
                .catch((error) => { setVideos({ ...videos, state: "failed" }) })
        }
    }, []);

    /* results */
    return(
        <div className="videos_container">
            {container()}
        </div>
    )
}