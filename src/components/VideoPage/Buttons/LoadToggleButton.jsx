import { useButtonContext } from './LoadToggleButtonProvider';
import { RepliesSection } from "../Replies/RepliesSection";

const LoadToggleButton = ({id}) => {
  const { isButtonPressed, toggleButton } = useButtonContext();

  return (
    <>
    <button onClick={toggleButton}>
      {isButtonPressed ? "Unload replies" : "Load replies"}
    </button>
    {isButtonPressed && <RepliesSection comment_id={id} />}
    </>
  );
};

export default LoadToggleButton;
