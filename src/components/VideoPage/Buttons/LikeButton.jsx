import cn from "classnames";
import "../../../css/VideoPage/videoLikeDislikeButtonStyle.scss";

const LikeButton = ({ likes, liked, handleLike }) => {

  const buttonClassName = cn("like-button-wrapper", {
    liked: liked,
  });

  return (
    <div>
          <span className="inlineSpan">
            <button onClick={handleLike}
              className={buttonClassName}>
              <div className="like-button">
                <span>Like</span>
                <span className={cn("suffix", { liked })}>d</span>
              </div>
            </button>
          </span>
          <span className="inlineSpan">{likes}</span>
    </div>
  );
};

export default LikeButton;