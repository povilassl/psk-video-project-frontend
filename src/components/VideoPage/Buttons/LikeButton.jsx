import { useState } from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";
import { addLike, removeLike } from "../../../services/video_endpoints/videoInteractions";
import { useSelector, useDispatch } from 'react-redux';
import "../../../css/VideoPage/videoLikeDislikeButtonStyle.scss";

const LikeButton = (likeCount) => {
  const { videoId } = useParams();
  const [liked, setLiked] = useState(null);
  //const [clicked, setClicked] = useState(false);
  const [changingClassName, setClass] = useState('like-button-wrapper');
  const [likes, setLikesCount] = useState(likeCount.param);

  function addOrRemove(liked) {
    if (liked) {
      addLike(videoId)
        .then(
          setLiked(liked),
          setClass(cn("like-button-wrapper", {
            liked
          })),
          setLikesCount(likes + 1)
        )
        .catch((error) => { console.log(error) });
    }
    else {
      removeLike(videoId)
        .then(
          setLiked(liked),
          setClass(cn("like-button-wrapper", {
            liked
          })),
          setLikesCount(likes - 1)
        )
        .catch((error) => { console.log(error) });
    }
  }

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span className="inlineSpan">
            <button
              onClick={() => {
                addOrRemove(!liked)
              }}
              className={changingClassName}>
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