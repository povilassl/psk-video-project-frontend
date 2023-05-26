import React from 'react';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import '../../css/UsersPages/profilePopup.css';
// C:\Users\riuna\Desktop\Github\psk-video-project-frontend\node_modules\reactjs-popup
const ProfileConfirmPopup = ({onPopupClose}) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleConfirm = () => {
    onPopupClose(true);
    setShowPopup(false);
  };

  const handleCancel = () => {
    onPopupClose(false);
    setShowPopup(false);
  };

  return (
    <Popup open={showPopup} closeOnDocumentClick={false}>
      <div className="modal">
        <button className="close" onClick={handleCancel}>
          &times;
        </button>
        <div className="header"> Version conflicts occurred </div>
        <div className="content">
            Do you want to save the latest changes?
        </div>
        <div className="actions">
          <button
            className="popupButton"
            onClick={handleConfirm}>
            Confirm
          </button>

          <button
            className="popupButton"
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Popup>
    );
}

export default ProfileConfirmPopup;