import React, { useEffect, useRef } from 'react';
import amp from 'azuremediaplayer';
import 'azuremediaplayer/dist/azuremediaplayer.min.css';
import '../css/videoPLayer.css';

export const AzureMediaPlayer = ({ manifestUrl }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current || !manifestUrl) return;

        const player = amp(videoRef.current, {
            nativeControlsForTouch: false,
            autoplay: false,
            controls: true,
            logo: { enabled: false },
        });

        player.src([
            {
                src: manifestUrl,
                type: 'application/vnd.ms-sstr+xml',
            },
        ]);

        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [manifestUrl]);

    return (
        <div className="video-container">
            <video
                ref={videoRef}
                id="azuremediaplayer"
                className="azuremediaplayer amp-default-skin amp-big-play-centered"
                tabIndex="0"
            ></video>
        </div>
    );
};
