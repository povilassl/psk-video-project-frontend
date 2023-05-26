import { useEffect, useState } from "react";
import { getCommentReplies } from "../../../services/video_endpoints/videoInteractions";
import { Comment } from "../Comments/Comment";
import { useReplySubmit } from "./ReplySubmitContext";


export const RepliesSection = ({ comment_id }) => {

    /* Container for replies in various fetch states */
    let container = () => {
        if (comments.state === "fetching") {
            return <div className="fetch_loading_container">Loading...</div>;
        } else if (comments.state === "failed") {
            return (
                <div className="fetch_failed_container">Failed to fetch data.</div>
            );
        } else if (comments.state === "fetched") {
            return (
                <div className="comments_fetched_container" style={{ marginLeft: '20px' }}>
                    <h4>Replies:</h4>
                    {comments.data.length > 0 ? comments.data.map((item) => (
                        <Comment key={item.id} comment={item} isReply={true} />
                    )) : <p><b>There are no replies for this comment</b></p>}
                </div>
            );
        }
    };

    /* Fetching comments */
    const [comments, setComments] = useState({
        state: null,
        data: null,
    });

    const { isReplySubmitted } = useReplySubmit();

    useEffect(() => {
        // to not fetch comments again if they are already fetched
        if (!comments.data) {
            setComments({ ...comments, state: "fetching" });
            getCommentReplies(comment_id)
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
        setComments({ ...comments, state: "fetching" });
        getCommentReplies(comment_id)
            .then((response) => {
                setComments({ state: "fetched", data: response.data });
            })
            .catch((error) => {
                setComments({ ...comments, state: "failed" });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReplySubmitted]);

    return (
        <div>
            {container()}
        </div>
    );
}