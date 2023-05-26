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
        <div className="header"> Info possibly changed in another tab or device </div>
        <div className="content">
            What do you want to do?
        </div>
        <div className="actions">
          <button
            className="popupButton"
            onClick={handleConfirm}>
            Save latest changes
          </button>

          <button
            className="popupButton"
            onClick={handleCancel}>
            Refresh and not save
          </button>
        </div>
      </div>
    </Popup>
    );
}

export default ProfileConfirmPopup;