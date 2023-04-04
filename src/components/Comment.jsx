import { Link } from "react-router-dom";
export const Comment = ({ comment }) => {
    return (
        <div>
            <p>Username: {comment.username}</p>
            <p>Date: {comment.dateTime}</p>
            <p>Comment: {comment.comment}</p>
        </div>
    );
}