import { Link } from "react-router-dom";

export const Video = ({ video }) => {
    return (
        <div style = {{border: '1px solid black'}}>
            <h3>Name: {video.videoName}</h3>
            <img src={video.thumbnailUrl} alt="thumbnail" />
            <p>Views: {video.viewCount}</p>
            <p>Likes: {video.likeCount}</p>
            <p>Dsilikes: {video.dislikeCount}</p>
            <p>Username: {video.username}</p>
            <p><Link key={video.id} to={`/video/${video.id}`}>Go to video</Link></p>
        </div>
    );
}