import { RepliesSection } from "./RepliesSection";

export const Comment = ({ comment }) => {

    return (
        <div style={{ border: '1px solid black' }}>
            <h4>Comment:</h4>
            <p>Username: {comment.username}</p>
            <p>Date: {comment.dateTime}</p>
            <p>Comment: {comment.comment}</p>
                {
                    //TODO: polling for new replies
                }
            {comment.hasComments === false &&
                <p>There are no replies for this comment</p>
            }
            <p>Write reply:</p> 
            {comment.hasComments === true &&
                //TODO: add button, which will show/load replies
                <RepliesSection comment_id={comment.id}/>
            }
        </div>
    );
}