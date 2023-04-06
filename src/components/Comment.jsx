import { format } from "date-fns";
import "../css/oneVideoPage.css";

export const Comment = ({ comment }) => {
    return (
        <div className="commentDiv">
            <div className="commentInfo">
                <p className="commentAuthor">{comment.username}</p>
                <p style={{margin: '0px'}}>{format(new Date(comment.dateTime), "yyyy-MM-dd, H:mm")}</p>
            </div>
            <div className="commentBody">
                <p>{comment.comment}</p>
                <button className="replyCommentButton">Reply</button>
            </div>
            
        </div>
    );
}
