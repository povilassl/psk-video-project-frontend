import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";

const LikeButton = () => {
    const [liked, setLiked] = useState(null);
  
    return (
      <button
        onClick={() => setLiked(!liked)}
        onAnimationEnd={() => setClicked(false)}
        className={cn("like-button-wrapper", {
          liked,
        })}
      >
        <div className="like-button">
          <Hand />
          <span>Like</span>
        </div>
      </button>
    );
  };
  
  export default LikeButton;