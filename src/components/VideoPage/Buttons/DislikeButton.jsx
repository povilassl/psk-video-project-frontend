import { useState } from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";
import { addDislike, removeDislike } from "../../../services/video_endpoints/videoInteractions";
import "../../../css/VideoPage/videoLikeDislikeButtonStyle.scss";
import { useSelector } from 'react-redux';

const DislikeButton = (dislikeCount) => {
  const { videoId } = useParams();
  const [disliked, setLiked] = useState(null);
  const [changingClassName, setClass] = useState('like-button-wrapper');
  const [dislikes, setDislikesCount] = useState(dislikeCount.param);

  function addOrRemove(disliked) {
    if (disliked) {
      addDislike(videoId)
        .then(
          setLiked(disliked),
          setClass(cn("like-button-wrapper", {
            disliked
          })),
          setDislikesCount(dislikes + 1)
        )
        .catch((error) => { console.log(error) });
    }
    else {
      removeDislike(videoId)
        .then(
          setLiked(disliked),
          setClass(cn("like-button-wrapper", {
            disliked
          })),
          setDislikesCount(dislikes - 1)
        )
        .catch((error) => { console.log(error) });
    }
  }

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span className="inlineSpan">
          <button
            onClick={() => {
              addOrRemove(!disliked)
            }}
            className={changingClassName}>
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
