import { format } from "date-fns";
import "../../../css/VideoPage/oneVideoPage.css";
import { ReplyForm } from "../Replies/ReplyForm";
import { LoadToggleButtonProvider } from "../Buttons/LoadToggleButtonProvider";
import LoadToggleButton from "../Buttons/LoadToggleButton";
import { useSelector } from 'react-redux';
import { ReplySubmitProvider } from "../Replies/ReplySubmitContext"

const Container = ({ comment }) => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="commentDiv">
      <div className="commentInfo">
        <p className="commentAuthor">{comment.username}</p>
        <p style={{ margin: '0px' }}>{format(new Date(comment.dateTime), "yyyy-MM-dd, H:mm")}</p>
      </div>
      <div className="commentBody">
        <p>{comment.comment}</p>

        {isAuthenticated ? (<ReplyForm comment_id={comment.id} />) : (<p style={{marginBottom: "15px"}}>please log in to reply</p>)}

        <LoadToggleButton id={comment.id} />
      </div>
    </div>
  )
}

export const Comment = ({ comment }) => {
  return (
    <LoadToggleButtonProvider>
      <ReplySubmitProvider>
        <Container comment={comment} />
      </ReplySubmitProvider>
    </LoadToggleButtonProvider>
  )
} 
