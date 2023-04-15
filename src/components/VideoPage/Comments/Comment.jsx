import { format } from "date-fns";
import "../../../css/VideoPage/oneVideoPage.css";
import { ReplyForm } from "../Replies/ReplyForm";
import { LoadToggleButtonProvider } from "../Buttons/LoadToggleButtonProvider";
import LoadToggleButton from "../Buttons/LoadToggleButton";

export const Comment = ({ comment, isReply }) => {

  return (
    <div className="commentDiv">
      <div className="commentInfo">
        <p className="commentAuthor">{comment.username}</p>
        <p style={{ margin: '0px' }}>{format(new Date(comment.dateTime), "yyyy-MM-dd, H:mm")}</p>
      </div>
      <div className="commentBody">
        <p>{isReply ? "Reply" : "Comment"}: {comment.comment}</p>
        {comment.hasComments === false &&
          <p><b>There are no replies for this {isReply ? "reply" : "comment"}</b></p>
        }
        <ReplyForm comment_id={comment.id} />
        {comment.hasComments === true &&
          <LoadToggleButtonProvider>
            <LoadToggleButton id={comment.id} />
          </LoadToggleButtonProvider>
        }
      </div>
    </div>
  )
} 
