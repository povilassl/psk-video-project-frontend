import { useParams } from "react-router-dom";
import { getAllVideos } from "../services/videos";
import { useEffect, useState } from "react";
import { CommentSection } from "./CommentSection";
import { increaseViewCount } from "../services/videoInteractions";

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
                    <img src={video.data.thumbnailUrl} alt="thumbnaill" />
                    <p>Views: {video.data.viewCount}</p>
                    <div >
                        <span style={spanStyle}>
                            <button >Like</button>
                        </span>
                        <span style={spanStyle}>{video.data.likeCount}</span>
                        <span style={spanStyle}>
                            <button >Dislike</button>
                        </span>
                        <span style={spanStyle}>{video.data.dislikeCount}</span>
                    </div>
                    <p>Username: {video.data.username}</p>
                    {video.data.hasComments === true &&
                        <CommentSection></CommentSection>
                    }
                    {video.data.hasComments === false &&
                        <h4>There are no comments for this video</h4>
                    }
                </div>
            );
        }
    }

    var likeButtonStyle ;
    var dislikeButtonStyle;
    const spanStyle = { display: 'inline-block', padding: '5px'};
    const { videoId } = useParams();

    /* Fetching videos */
    const [video, setVideo] = useState(
        {
            state: null,
            data: null
        }
    );

    //TODO: live peržiūrų kitimas?
    //Vėliau turėtų peržiūrų padidinimas priklausyti nuo video peržiūrėjimo trukmės
    var myFunc = function() {
        increaseViewCount(videoId)
                .catch((error) => {console.log(error)});
         
        //alertas panaudotas grynai veikimo tikrinimui
        alert('Your view has been counted after 10 second of waiting in this page');        
      }

    window.onload = function() {
        setTimeout(myFunc, 10000);
      }

    useEffect(() => {
        // to not fetch videos again if they are already fetched
        if (!video.data) {
            setVideo({ ...video, state: "fetching" });
            getAllVideos()
                .then((response) => { 
                    setVideo({ state: "fetched", data: response.data.filter((item) => item.id === Number(videoId))[0] })                })
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