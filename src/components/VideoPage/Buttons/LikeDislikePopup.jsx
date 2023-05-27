import React from 'react';
import Popup from 'reactjs-popup';
import '../../../css/UsersPages/profilePopup.css';

const LikeDislikePopup = ({show, onClose}) => {
    const handleOk = () => {
        onClose();
    };

    return (
        <Popup open={show} closeOnDocumentClick={true}>
        <div className="modal">
            <button className="close" onClick={handleOk}>
            &times;
            </button>
            <div className="header"> Sorry, you can't do this </div>
            <div className="content">
            Please log in if you want to like/dislike this video
            </div>
            <div className="actions">
            <button
                className="popupButton"
                onClick={handleOk}>
                Ok
            </button>
            </div>
        </div>
        </Popup>
    );
}

export default LikeDislikePopup;