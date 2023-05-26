import LikeButton from "../Buttons/LikeButton";
import DislikeButton from "../Buttons/DislikeButton";
import { useEffect, useState } from "react";
import { addLike, removeLike, addDislike, removeDislike, getVideoReaction } from "../../../services/video_endpoints/videoInteractions";

const LikeAndDislikeButtons = ({videoId, likes, dislikes}) => {
    const [liked, setLiked] = useState(null);
    const [disliked, setDisliked] = useState(null);
    const [interactionInProgress, setInteractionInProgress] = useState(false);

    useEffect(() => {
         console.log(videoId);
        getVideoReaction(videoId)
            .then((response) => { 
                if(response.data === 0) //liked
                {
                    console.log("veikia like");
                    setLiked(true);
                    setDisliked(false);
                }
                else if(response.data === 1) //disliked
                {
                    console.log("veikia dislike");
                    setLiked(false);
                    setDisliked(true);
                    console.log(disliked);
                    console.log(liked);
                }
                else if(response.data === 2) //none
                {
                    console.log("veikia");
                    setLiked(false);
                    setDisliked(false);
                }
            })
            .catch((error) => { 
                console.log(error)
             });
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    const handleLike = () => {
        if (!interactionInProgress) {
            // console.log(liked);
            // console.log(!liked);
          setLiked(!liked);
          setDisliked(false);
        //   console.log("buvo like");
        }

        if(liked)
        {
            addLike(videoId)
                .then((response) => {console.log(response)})
                .catch((error) => { 
                    console.log(error)
                 });
        }
        else
        {
            removeLike(videoId)
                .then((response) => {console.log(response)})
                .catch((error) => { 
                    console.log(error)
                 });
        }
    };
    
    const handleDislike = () => {
        if (!interactionInProgress) {
            console.log("buvo dislike - pries", disliked)
          setDisliked(!disliked);
          setLiked(false);
          console.log("buvo dislike - dabar", disliked)
        }

        if(disliked)
        {
            console.log("bandom adint dislike");
            addDislike(videoId)
                .then((response) => {console.log(response)})
                .catch((error) => { 
                    console.log(error)
                 });
        }
        else
        {   console.log("bandom removint dislike");
            removeDislike(videoId)
                .then((response) => {console.log(response)})
                .catch((error) => { 
                    console.log(error)
                 });
        }
    };
    // console.log(likes)
    // console.log(dislikes)
    return (
        <div className="sideBySideHorizontallyLikeDislike" >
            <span className="inlineSpan">
                <LikeButton likes={likes} liked={liked} handleLike={handleLike}/>
            </span>
            <span className="inlineSpan">
                <DislikeButton dislikes={dislikes} disliked={disliked} handleDislike={handleDislike} />
            </span>
        </div>  
    );

}

export default LikeAndDislikeButtons;