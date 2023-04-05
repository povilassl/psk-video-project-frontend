import { useParams } from "react-router-dom";
import { getAllVideos } from "../services/videos";
import { useEffect, useState } from "react";
import { CommentSection } from "./CommentSection";
import { CommentForm } from "./CommentForm";

export const VideoPage = () => {

    const { videoId } = useParams();

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
                    <img src={video.data.thumbnailUrl} alt="thumbnaill" />
                    {
                        //TODO: polling for new likes/dislikes
                    }
                    <p>Likes: {video.data.likeCount}</p>
                    <p>Dislikes: {video.data.dislikeCount}</p>
                    <p>Username: {video.data.username}</p>

                    {
                        //TODO: refetch comments after posting a new one}
                    }
                    <CommentForm videoId={videoId}/>
                    {video.data.hasComments === true &&
                        //TODO: polling for new comments
                        <CommentSection />
                    }
                    {video.data.hasComments === false &&
                        <h4>There are no comments for this video</h4>
                    }
                </div>
            );
        }
    }

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
            setVideo({ ...video, state: "fetching" });
            getAllVideos()
                .then((response) => { setVideo({ state: "fetched", data: response.data.filter((item) => item.id === Number(videoId))[0] })})
                .catch((error) => { setVideo({ ...video, state: "failed" })});
        }
    }, []);
    console.log(video);
    return (
        <div>
            {container()}
        </div>
    );

}