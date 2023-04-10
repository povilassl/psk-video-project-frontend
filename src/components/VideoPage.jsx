import { useParams } from "react-router-dom";
import { getAllVideos } from "../services/videos";
import { useEffect, useState } from "react";
import { CommentSection } from "./CommentSection";
import { CommentForm } from "./CommentForm";
import { increaseViewCount } from "../services/videoInteractions";
import LikeButton from "../components/LikeButton";
import DislikeButton from "../components/DislikeButton";
import "../css/commonStyles.css";
import "../css/videoListPage.css";

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
                    <h3>{video.data.videoName}</h3>
                    {
                        //TODO: polling for new likes/dislikes
                    }
                    <p>Uploaded by: {video.data.username}</p>
                    <div style={{marginLeft: '5px'}}>
                        <span className="logoSpan"><img className='Logo' src = {require("../assets/eye.png")} alt='eye logo'/></span>
                        <span className="numberSpan">{video.data.viewCount} </span>
                    </div>
                    <span className="inlineSpan"><LikeButton param={video.data.likeCount}/></span>
                    <span className="inlineSpan"><DislikeButton param={video.data.dislikeCount}/></span> 
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

        //TODO: live peržiūrų kitimas?
        //Vėliau turėtų peržiūrų padidinimas priklausyti nuo video peržiūrėjimo trukmės
        var myFunc = function() {
            increaseViewCount(videoId)
                    .catch((error) => {console.log(error)});     
        }

        // to not fetch videos again if they are already fetched
        if (!video.data) {
            setVideo({ ...video, state: "fetching" });
            getAllVideos()
                .then((response) => { setVideo({ state: "fetched", data: response.data.filter((item) => item.id === Number(videoId))[0] })})
                .catch((error) => { setVideo({ ...video, state: "failed" })});
        }
        var timer = setTimeout(myFunc, 10000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(video);
    return (
        <div>
            {container()}
        </div>
    );

}