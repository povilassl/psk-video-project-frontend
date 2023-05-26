import { useParams } from "react-router-dom";
import { getVideoComments } from "../../../services/video_endpoints/videoInteractions";
import { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { useCommentSubmit } from "./CommentSubmitContext";

export const CommentSection = () => {
  /* Container for comments in various fetch states */
  let container = () => {
    if (comments.state === "fetching") {
      return <div className="fetch_loading_container"><span class="small_loader"></span></div>;
    } else if (comments.state === "failed") {
      return (
        <div className="fetch_failed_container">Failed to fetch data.</div>
      );
    } else if (comments.state === "fetched") {
      return (
        <div className="comments_fetched_container">
          <h4>Comments:</h4>
          {comments.data.map((item) => (
            <Comment key={item.id} comment={item} isReply={false} />
          ))}
        </div>
      );
    }
  };

  const { videoId } = useParams();

  const { isCommentSubmitted, setIsCommentSubmitted } = useCommentSubmit();

  /* Fetching videos */
  const [comments, setComments] = useState({
    state: null,
    data: null,
  });

  useEffect(() => {
    // to not fetch comments again if they are already fetched
    if (!comments.data) {
      setComments({ ...comments, state: "fetching" });
      getVideoComments(videoId)
        .then((response) => {
          setComments({ state: "fetched", data: response.data });
        })
        .catch((error) => {
          setComments({ ...comments, state: "failed" });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // to not fetch comments again if they are already fetched
    if (isCommentSubmitted) {
      setComments({ ...comments, state: "fetching" });
      getVideoComments(videoId)
        .then((response) => {
          setComments({ state: "fetched", data: response.data });
        })
        .catch((error) => {
          setComments({ ...comments, state: "failed" });
        });

        setIsCommentSubmitted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCommentSubmitted]);

  return <div>{container()}</div>;
};
