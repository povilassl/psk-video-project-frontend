import React, { useState } from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";
import { addLike, removeLike } from "../services/videoInteractions";

import "../css/likeButtonStyle.scss";

const LikeButton = () => {
    const { videoId } = useParams();
    const [liked, setLiked] = useState(null);
    //const [clicked, setClicked] = useState(false);
  
    function addOrRemove(liked)
    {
        if(liked)
        {
          addLike(videoId)
            .catch((error) => {console.log(error)}); 
        }
        else
        {
          removeLike(videoId)
            .catch((error) => {console.log(error)});
        }
    }

    return (
      <button
        onClick={() => {
          setLiked(!liked);
          addOrRemove(!liked)
          
        }}
        //onAnimationEnd={() => setClicked(false)}
        className={cn("like-button-wrapper", {
          liked,
        })}>
        <div className="like-button">
          <span>Like</span>
          <span className={cn("suffix", { liked })}>d</span>
        </div>
      </button>
    );
  };
  
  export default LikeButton;
