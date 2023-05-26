import { useState, createContext, useContext  } from 'react';

const ReplySubmitContext = createContext();

const useReplySubmit = () => {
    return useContext(ReplySubmitContext);
  };

const ReplySubmitProvider = ({ children }) => {
  const [isReplySubmitted, setIsReplySubmitted] = useState(false);

  return (
    <ReplySubmitContext.Provider value={{ isReplySubmitted, setIsReplySubmitted }}>
      {children}
    </ReplySubmitContext.Provider>
  );
};

export { useReplySubmit, ReplySubmitProvider };
