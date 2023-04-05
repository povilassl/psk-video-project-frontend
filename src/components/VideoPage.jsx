import { useParams } from "react-router-dom";
import { getAllVideos } from "../services/videos";
import { useEffect, useState } from "react";

export const VideoPage = () => {

    /* Container for video in various fetch states */
    let container = () => {
        if (video.state === 'fetching') {
            return <div className="fetch_loading_container">Loading...</div>;
        }

        else if (video.state === 'failed') {
            return <div className="fetch_failed_container">Failed to fetch data.</div>;
        }

        else if (video.state === 'fetched') {
            return (
                <div className="video_fetched_container">
                    <h3>Name: {video.data.videoName}</h3>
                    <img src={video.data.thumbnailUrl} alt="thumbnail" />
                    <p>Likes: {video.data.likeCount}</p>
                    <p>Dislikes: {video.data.dislikeCount}</p>
                    <p>Username: {video.data.username}</p>
                </div>
            );
        }
    }

    const { videoId } = useParams();

    /* Fetching videos */
    const [video, setVideo] = useState(
        {
            state: null,
            data: null
        }
    );

    useEffect(() => {
        // to not fetch videos again if they are already fetched
        if (!video.data) {
            setVideo({ ...video, state: "fetching" })
            getAllVideos()
                .then((response) => { setVideo({ state: "fetched", data: response.data.filter((item) => item.id === Number(videoId))[0] })})
                .catch((error) => { setVideo({ ...video, state: "failed" })})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(video)
    return (
        <div>
            {container()}
        </div>
    );

}