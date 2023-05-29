import { useEffect, useState } from 'react';
import { postReplyToComment } from '../../../services/video_endpoints/videoInteractions';
import { useReplySubmit } from './ReplySubmitContext';

export const ReplyForm = ({ comment_id }) => {
    const [replyData, setReplyData] = useState({
        comment: '',
        status: null,
    });

    const { isReplySubmitted, setIsReplySubmitted } = useReplySubmit();

    useEffect(() => {
        if (replyData.status === 'success') {
            setIsReplySubmitted(!isReplySubmitted);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [replyData.status]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setReplyData({ ...replyData, status: 'submitting' })
        try {
            await postReplyToComment(comment_id, replyData.comment);
            console.log('reply posted successfully!');
            setReplyData({ comment: '', status: 'success' });
        } catch (error) {
            console.error('Failed to post reply!');
            setReplyData({ ...replyData, status: 'failed' });
        }
    };

    return (
        <div>
            <p style={{marginBottom: "10px"}}>Write reply:</p>
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