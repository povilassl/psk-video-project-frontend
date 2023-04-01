export const Video = ({ video }) => {
    return (
        <div>
            <h3>{video.videoName}</h3>
            <p>{video.likeCount}</p>
        </div>
    );
}