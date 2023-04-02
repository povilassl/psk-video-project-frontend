import { getAllVideos } from "../services/videos";
import React, { useState, useEffect } from 'react';
import { Video } from "./Video";

export const VideoList = () => {

    /* Container for videos in various fetch states */
    let container = () => {
        if (videos.state === 'fetching') {
            return <div className="fetch_loading_container">Loading...</div>;
        }
    
        else if (videos.state === 'failed') {
            return <div className="fetch_failed_container">Failed to fetch data.</div>;
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
console.log(videos);
    /* results */
    return(
        <div className="videos_container">
            {container()}
        </div>
    )
}