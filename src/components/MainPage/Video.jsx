import { Link } from "react-router-dom";
import "../../css/MainPage/videoListPage.css";
import "../../css/MainPage/commonStyles.css";
import "../../css/MainPage/thumbnail.css"
import "../../css/Colors.css"

export const Video = ({ video }) => {
    return (
        <div className="oneVideoDiv">
            <h3> {video.videoName}</h3>
            <img className="thumbnail_container" src={video.thumbnailURL} alt="thumbnail" />
            <p>Uploaded by: {video.username}</p>
            <div>
                <span className="logoSpan"><img className='Logo' src={require("../../assets/eye.png")} alt='eye logo' /></span>
                <span className="numberSpan">{video.viewCount} </span>
                <span className="logoSpan"><img className='Logo' src={require("../../assets/like.png")} alt='like logo' /></span>
                <span className="numberSpan"> {video.likeCount}</span>
                <span className="logoSpan"><img className='Logo' src={require("../../assets/dislike.png")} alt='dislike logo' /></span>
                <span className="numberSpan">{video.dislikeCount}</span>
                <span className="logoSpan"><img className='Logo' src={require("../../assets/duration.png")} alt='duration logo' /></span>
                <span className="inlineSpan" style={{ fontWeight: 400 }}>{video.videoDurationInSeconds} s.</span>
            </div>
            <p><Link style={{ color: 'var(--small-text-color)' }} key={video.id} to={`/video/${video.id}`}>Go to video</Link></p>
        </div>
    );
}