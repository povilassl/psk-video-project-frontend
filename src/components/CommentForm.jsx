import { useState } from 'react';
import { postCommentOnVideo } from '../services/videoInteractions';
import "../css/videoLikeDislikeButtonStyle.scss";
import "../css/oneVideoPage.css";

export const CommentForm = ({videoId}) => {
    const [commentData, setCommentData] = useState({
        comment: '',
        status: null,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCommentData({ ...commentData, status: 'submitting' });

        try {
            await postCommentOnVideo(videoId, commentData.comment, 'username');
            console.log('Comment posted successfully!');
            setCommentData({ comment: '', status: 'success' });
        } catch (error) {
            console.error('Failed to post comment!');
            setCommentData({ ...commentData, status: 'failed' });
        }
    };

    return (
        <div>
            <h4>Comment on the video:</h4>
            {commentData.status === 'success' && (
                <p style={{ color: 'green' }}>Comment posted successfully!</p>
            )}
            {commentData.status === 'failed' && (
                <p style={{ color: 'red' }}>Failed to post comment!</p>
            )}
            <form onSubmit={handleSubmit}>
                <textarea 
                    className='commentTextArea'
                    value={commentData.comment}
                    onChange={(event) =>
                        setCommentData({ ...commentData, comment: event.target.value })
                    }
                    placeholder="Type your comment here..."
                />
                <div>
                    <button className='sumbitCommentButton' type="submit" disabled={commentData.status === 'submitting'} >
                        {commentData.status === 'submitting' ? 'Submitting...' : 'Submit'}   
                    </button>
                </div>
               
            </form>
        </div>
    );
}