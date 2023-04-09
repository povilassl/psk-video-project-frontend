import { RepliesSection } from "./RepliesSection";
import { ReplyForm } from "./ReplyForm";

export const Comment = ({ comment, isReply }) => {

    return (
        <div style={{ border: '1px solid black' }}>
            <h4>Comment:</h4>
            <p>Username: {comment.username}</p>
            <p>Date: {comment.dateTime}</p>
            <p>{isReply ? "Reply" : "Comment"}: {comment.comment}</p>
                {
                    //TODO: polling for new replies
                }
            {comment.hasComments === false &&
                <p>There are no replies for this comment</p>
            }
            <ReplyForm comment_id={comment.id}/>
            {comment.hasComments === true &&
                //TODO: add button, which will show/load replies
                <RepliesSection comment_id={comment.id}/>
            }
        </div>
    );
}