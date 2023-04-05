export const Comment = ({ comment }) => {
    return (
        <div style = {{border: '1px solid black'}}>
            <p>Username: {comment.username}</p>
            <p>Date: {comment.dateTime}</p>
            <p>Comment: {comment.comment}</p>
        </div>
    );
}