import React, { useState } from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";
import { addDislike, removeDislike } from "../services/videoInteractions";

import "../css/videoLikeDislikeButtonStyle.scss";

  const DislikeButton = (dislikeCount) => {
    const { videoId } = useParams();
    const [disliked, setLiked] = useState(null);
    //const [clicked, setClicked] = useState(false);
    const [changingClassName, setClass] = useState('like-button-wrapper');
    const [dislikes, setDislikesCount] = useState(dislikeCount.param);

    function addOrRemove(disliked)
    {
        if(disliked)
        {
            addDislike(videoId)
                .then(
                  setLiked(disliked),
                  setClass(cn("like-button-wrapper", {
                    disliked})),
                  setDislikesCount(dislikes+1)
                )
                .catch((error) => {console.log(error)});      
        }
        else
        {
            removeDislike(videoId)
                .then(
                  setLiked(disliked),
                  setClass(cn("like-button-wrapper", {
                    disliked})),
                  setDislikesCount(dislikes-1)
                )
                .catch((error) => {console.log(error)});         
        }
    }

    return (
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
    );
  };
  
  export default DislikeButton;
