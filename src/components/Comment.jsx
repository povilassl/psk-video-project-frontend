import { format } from "date-fns";
import "../css/oneVideoPage.css";
import { RepliesSection } from "./RepliesSection";
import { ReplyForm } from "./ReplyForm";

export const Comment = ({ comment, isReply }) => {
    return (
        <div className="commentDiv">
            <div className="commentInfo">
                <p className="commentAuthor">{comment.username}</p>
                <p style={{margin: '0px'}}>{format(new Date(comment.dateTime), "yyyy-MM-dd, H:mm")}</p>
            </div>
            <div className="commentBody">
              <p>{isReply ? "Reply" : "Comment"}: {comment.comment}</p>
                {
                    //TODO: polling for new replies
                }
              {comment.hasComments === false &&
                <p>There are no replies for this comment</p>
              }
              <ReplyForm comment_id={comment.id}/>
              {comment.hasComments === true &&
              
                //TODO: implement button, which will show/load replies
                <RepliesSection comment_id={comment.id}/>
              }
            </div>
        </div>
            
