import React, { useRef, useEffect } from 'react';
import useScript from '../services/useScript';
import useStylesheet from '../services/useStylesheet';
import '../css/videoPointer.css'

const AzureMediaPlayer = ({ src, options }) => {
  const videoRef = useRef(null);
  const scriptLoaded = useScript('//amp.azure.net/libs/amp/latest/azuremediaplayer.min.js');
  useStylesheet('//amp.azure.net/libs/amp/latest/skins/amp-default/azuremediaplayer.min.css');

  useEffect(() => {
    if (!videoRef.current || !scriptLoaded) return;
    if (!window.amp) {
      console.error('Azure Media Player script is not loaded');
      return;
    }

    const mediaPlayer = window.amp(videoRef.current, options);
    mediaPlayer.src([{
      src: src,
      type: "application/vnd.ms-sstr+xml"
    }]);

    return () => {
      mediaPlayer.dispose();
    };
  }, [src, options, scriptLoaded]);

  return (
    <video
      ref={videoRef}
      className="azuremediaplayer amp-default-skin amp-big-play-centered"
      tabIndex="0"
    ></video>
  );
};

export default AzureMediaPlayer;
