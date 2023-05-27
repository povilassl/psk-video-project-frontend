import cn from "classnames";
import { useSelector } from 'react-redux';
import "../../../css/VideoPage/videoLikeDislikeButtonStyle.scss";

const LikeButton = ({ likes, liked, handleLike }) => {

  const buttonClassName = cn("like-button-wrapper", {
    liked: liked,
  });

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? (
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
        </div>) : (
        <p>please log in</p>)}
    </div>
  );
};

export default LikeButton;