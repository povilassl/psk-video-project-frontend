import LikeButton from "../Buttons/LikeButton";
import DislikeButton from "../Buttons/DislikeButton";
import { useEffect, useState } from "react";
import { addLike, removeLike, addDislike, removeDislike, getVideoReaction } from "../../../services/video_endpoints/videoInteractions";
import LikeDislikePopup from "./LikeDislikePopup"
import { useSelector } from 'react-redux';

const LikeAndDislikeButtons = ({ videoId, likes, dislikes }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [local_likes, setLikes] = useState(likes);
    const [local_dislikes, setDislikes] = useState(dislikes);
    const [showPopup, setShowPopup] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    

    useEffect(() => {
        getVideoReaction(videoId)
            .then((response) => {
                if (response.data === 0) //liked
                {
                    setLiked(true);
                    setDisliked(false);
                }
                else if (response.data === 1) //disliked
                {
                    setLiked(false);
                    setDisliked(true);
                }
                else if (response.data === 2) //none
                {
                    setLiked(false);
                    setDisliked(false);
                }
            })
            .catch((error) => {
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    const handleLikeDislikeWithoutLogin = () => {
        setShowPopup(true);
    }

    const closePopup = () =>{
        setShowPopup(false);
    }


    const handleLike = () => {
        if (disliked === true) {
            setDislikes(local_dislikes - 1);
        }
        setLiked(!liked);
        setDisliked(false);
        handleLikeDb(!liked);   //paduodam priesinga nes setLiked nesuveikia is karto

    };

    const handleLikeDb = (like) => {
        if (like) {
            addLike(videoId)
                .then((response) => {
                    setLikes(local_likes + 1);
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        else {
            removeLike(videoId)
                .then((response) => {
                    setLikes(local_likes - 1);
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    const handleDislike = () => {
        if (liked === true) {
            setLikes(local_likes - 1);
        }
        setDisliked(!disliked);
        setLiked(false);
        handleDislikeDb(!disliked);  //paduodam priesinga nes setDisliked nesuveikia is karto
    };

    const handleDislikeDb = (dislike) => {
        if (dislike) {
            addDislike(videoId)
                .then((response) => {
                    setDislikes(local_dislikes + 1);
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        else {
            removeDislike(videoId)
                .then((response) => {
                    setDislikes(local_dislikes - 1);
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    return (
        <div className="sideBySideHorizontallyLikeDislike" >
             {showPopup && <LikeDislikePopup show={showPopup} onClose={closePopup}/>}
            {isAuthenticated ? (
                <>
                <span className="inlineSpan">
                    <LikeButton likes={local_likes} liked={liked} handleLike={handleLike} />
                </span>
                <span className="inlineSpan">
                        <DislikeButton dislikes={local_dislikes} disliked={disliked} handleDislike={handleDislike} />
                </span>
                    </>)
             : (
                <>
                <span className="inlineSpan">
                    <LikeButton likes={local_likes} liked={liked} handleLike={handleLikeDislikeWithoutLogin} />
                </span>
                <span className="inlineSpan">
                        <DislikeButton dislikes={local_dislikes} disliked={disliked} handleDislike={handleLikeDislikeWithoutLogin} />
                </span>
                    </>
             )}
            
        </div>
    );
}

export default LikeAndDislikeButtons;