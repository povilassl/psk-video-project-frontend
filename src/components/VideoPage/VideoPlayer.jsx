import { useRef, useEffect, useState } from 'react';
import useScript from '../../services/script_and_styles_downloader/useScript';
import useStylesheet from '../../services/script_and_styles_downloader/useStylesheet';

const AzureMediaPlayer = ({ src, options }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
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

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isHovered) return;
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, left: 0, behavior: 'smooth' });
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isHovered]);

  return (
    <video
      ref={videoRef}
      className="azuremediaplayer amp-default-skin amp-big-play-centered"
      tabIndex="0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    ></video>
  );
};

export default AzureMediaPlayer;
