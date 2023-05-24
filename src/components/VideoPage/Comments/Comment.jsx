import { format } from "date-fns";
import "../../../css/VideoPage/oneVideoPage.css";
import { ReplyForm } from "../Replies/ReplyForm";
import { LoadToggleButtonProvider } from "../Buttons/LoadToggleButtonProvider";
import LoadToggleButton from "../Buttons/LoadToggleButton";
import { useSelector } from 'react-redux';

export const Comment = ({ comment, isReply }) => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  
  return (
    <div className="commentDiv">
      <div className="commentInfo">
        <p className="commentAuthor">{comment.username}</p>
        <p style={{ margin: '0px' }}>{format(new Date(comment.dateTime), "yyyy-MM-dd, H:mm")}</p>
      </div>
      <div className="commentBody">
        <p>{comment.comment}</p>
        {comment.hasComments === false &&
          <p><b>There are no replies for this {isReply ? "reply" : "comment"}</b></p>
        }
        {isAuthenticated ? (<ReplyForm comment_id={comment.id} />) : (<p>please log in to reply</p>)}
        {comment.hasComments === true &&
          <LoadToggleButtonProvider>
            <LoadToggleButton id={comment.id} />
          </LoadToggleButtonProvider>
        }
      </div>
    </div>
  )
} 
