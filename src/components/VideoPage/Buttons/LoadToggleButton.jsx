import { useButtonContext } from './LoadToggleButtonProvider';
import { RepliesSection } from "../Replies/RepliesSection";
import { useReplySubmit } from '../Replies/ReplySubmitContext';
import { useEffect } from 'react';

const LoadToggleButton = ({ id }) => {
  const { isButtonPressed, toggleButton } = useButtonContext();
  const { isReplySubmitted, setIsReplySubmitted } = useReplySubmit();

  useEffect(() => {
    if (isReplySubmitted && !isButtonPressed) {
      toggleButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReplySubmitted]);

  useEffect(() => {
    if (!isButtonPressed) {
      setIsReplySubmitted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isButtonPressed]);

  return (
    <>
      <button className={`sumbitCommentButton ${isButtonPressed ? "pressed" : "not-pressed"}`} onClick={toggleButton}>
        {(isButtonPressed || isReplySubmitted) ? "Unload replies" : "Load replies"}
      </button>
      {(isButtonPressed || isReplySubmitted) && <RepliesSection comment_id={id} />}
    </>
  );
};

export default LoadToggleButton;
