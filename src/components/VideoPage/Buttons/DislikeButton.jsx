import cn from "classnames";
import "../../../css/VideoPage/videoLikeDislikeButtonStyle.scss";

const DislikeButton = ({ dislikes, disliked, handleDislike }) => {

  const buttonClassName = cn("like-button-wrapper", {
    disliked: disliked,
  });

  return (
    <div>
          <span className="inlineSpan">
            <button onClick={handleDislike}
              className={buttonClassName}>
              <div className="like-button">
                <span>Dislike</span>
                <span className={cn("suffix", { disliked })}>d</span>
              </div>
            </button>

          </span>
          <span className="inlineSpan">{dislikes}</span>
    </div>
  );
};

export default DislikeButton;
