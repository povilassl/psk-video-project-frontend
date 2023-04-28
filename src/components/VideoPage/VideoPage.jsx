import { useParams } from "react-router-dom";
import { getAllVideos } from "../../services/video_endpoints/videos";
import { useEffect, useState } from "react";
import { CommentSection } from "./Comments/CommentSection";
import { CommentForm } from "./Comments/CommentForm";
import { increaseViewCount } from "../../services/video_endpoints/videoInteractions";
import LikeButton from "./Buttons/LikeButton";
import DislikeButton from "./Buttons/DislikeButton";
import "../../css/VideoPage/oneVideoPage.css";

import AzureMediaPlayer from './VideoPlayer';

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

            const options = {
                nativeControlsForTouch: false,
                autoplay: true,
                controls: true,
                width: '640',
                height: '400',
                logo: { enabled: false },
                poster: ''
            };

            return (
                <div className="video_fetched_container">
                    <div className="videoInfoDiv">
                        <h3>{video.data.videoName}</h3>
                        <AzureMediaPlayer src={video.data.videoURL} options={options}/>
                        <div className="infoDiv">
                        {
                            //TODO: polling for new likes/dislikes
                        }
                            <div className="inEachSideDiv">
                                <div className="sideBySideHorizontallyModified">
                                    <i className="icon uil uil-user"></i>
                                    <p>{video.data.username}</p>
                                </div>                                
                            </div>

                            <div className="inEachSideDiv">
                                <div className="sideBySideHorizontallyModified" >
                                    <i className="icon uil uil-eye"></i>
                                    <div className="viewDiv"> {video.data.viewCount} </div>         
                                </div>
                                <div className="sideBySideHorizontallyLikeDislike" >
                                    <span className="inlineSpan"><LikeButton param={video.data.likeCount} /></span>
                                    <span className="inlineSpan"><DislikeButton param={video.data.dislikeCount} /></span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="commentSecotionDiv">
                        {
                            //TODO: refetch comments after posting a new one}
                        }
                        <CommentForm videoId={videoId} />
                        {video.data.hasComments === true &&
                            //TODO: polling for new comments
                            <CommentSection />
                        }
                        {video.data.hasComments === false &&
                            <h4>There are no comments for this video</h4>
                        }
                    </div>
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
        var myFunc = function () {
            increaseViewCount(videoId)
                .catch((error) => { console.log(error) });
        }

        // to not fetch videos again if they are already fetched
        if (!video.data) {
            setVideo({ ...video, state: "fetching" });
            getAllVideos()
                .then((response) => { setVideo({ state: "fetched", data: response.data.filter((item) => item.id === Number(videoId))[0] }) })
                .catch((error) => { setVideo({ ...video, state: "failed" }) });
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