import { getAllVideos } from "../../services/video_endpoints/videos";
import React, { useState, useEffect } from "react";
import { Video } from "./Video";
import { getVideoCount } from "../../services/video_endpoints/videoInteractions";
import "../../css/MainPage/videoListPage.css";

export const VideoList = () => {
  /* Container for videos in various fetch states */
  let container = () => {
    if (videos.state === "fetching") {
      return <div className="fetch_loading_container">
                <span className="big_loader">L &nbsp; ading</span>
              </div>;
    } else if (videos.state === "failed") {
      return (
        <div className="fetch_failed_container">
            <span className="big_failed">S<i class="big_failed_emoji uil uil-sad-dizzy"></i>mething went wrong</span>
        </div>
      );
    } else if (videos.state === "fetched") {
      return (
        <div className="videos_fetched_container">
          {videos.data.map((item) => (
            <Video key={item.id} video={item} />
          ))}
        </div>
      );
    }
  };

  /* Fetching videos */
  const [videos, setVideos] = useState({
    state: null,
    data: null,
  });


  //const [videoCount, setVideoCount] = useState(0);

  useEffect(() => {
    // to not fetch videos again if they are already fetched
    if (!videos.data) {
      setVideos({ ...videos, state: "fetching" });

      //TODO: lazy loading (fetching x videos at a time), rn it fetches all videos
      getVideoCount()
        .then((response) => {
          getAllVideos(0, response.data)
            .then((response) => {
              setVideos({ state: "fetched", data: response.data });
            })
            .catch((error) => {
              setVideos({ ...videos, state: "failed" });
            });
        })
        .catch((error) => {
          setVideos({ ...videos, state: "failed" });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  return <div className="videos_container">{container()}</div>;
};
