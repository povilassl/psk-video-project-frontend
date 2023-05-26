import cn from "classnames";
import "../../../css/VideoPage/videoLikeDislikeButtonStyle.scss";
import { useSelector } from 'react-redux';

const DislikeButton = ({dislikes, disliked, handleDislike}) => {

  const buttonClassName = cn("like-button-wrapper", {
    disliked: disliked,
  });
  
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? (
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
      ): <p>please log in</p>}
  
    </div>
  );
};

export default DislikeButton;
