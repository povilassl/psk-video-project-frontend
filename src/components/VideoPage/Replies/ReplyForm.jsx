import { useState } from 'react';
import { postReplyToComment } from '../../../services/video_endpoints/videoInteractions';

export const ReplyForm = ({comment_id}) => {
    const [replyData, setReplyData] = useState({
        comment: '',
        status: null,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setReplyData({ ...replyData, status: 'submitting' });

        try {
            await postReplyToComment(comment_id, replyData.comment, 'username');
            console.log('Comment posted successfully!');
            setReplyData({ comment: '', status: 'success' });
        } catch (error) {
            console.error('Failed to post comment!');
            setReplyData({ ...replyData, status: 'failed' });
        }
    };

    return (
        <div>
            <p>Write reply:</p> 
            {replyData.status === 'success' && (
                <p style={{ color: 'green' }}>Comment posted successfully!</p>
            )}
            {replyData.status === 'failed' && (
                <p style={{ color: 'red' }}>Failed to post comment!</p>
            )}
            <form onSubmit={handleSubmit}>
                <div className='sideBySideHorizontallyByEnd'>
                    <textarea
                        className='commentTextArea'
                        value={replyData.comment}
                        onChange={(event) =>
                            setReplyData({ ...replyData, comment: event.target.value })
                        }
                        placeholder="Type your reply here..."
                    />
                    <button className='sumbitCommentButton' type="submit" disabled={replyData.status === 'submitting'}>
                        {replyData.status === 'submitting' ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}