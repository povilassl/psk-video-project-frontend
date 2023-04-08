import { useEffect, useState } from "react";
import { getCommentReplies } from "../services/videoInteractions";
import { Comment } from "./Comment";

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
                <div className="comments_fetched_container" style={{marginLeft: '20px'}}>
                    <h4>Replies:</h4>
                    {comments.data.map((item) => (
                        <Comment key={item.id} comment={item}/>
                    ))}
                </div>
            );
        }
    };

    /* Fetching comments */
    const [comments, setComments] = useState({
        state: null,
        data: null,
    });

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

    return (
        <div>
            {container()}
        </div>
    );
}