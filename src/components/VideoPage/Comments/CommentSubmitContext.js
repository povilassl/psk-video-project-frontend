import { useState, createContext, useContext  } from 'react';

const CommentSubmitContext = createContext();

const useCommentSubmit = () => {
    return useContext(CommentSubmitContext);
  };

const CommentSubmitProvider = ({ children }) => {
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);


  return (
    <CommentSubmitContext.Provider value={{ isCommentSubmitted, setIsCommentSubmitted }}>
      {children}
    </CommentSubmitContext.Provider>
  );
};

export { useCommentSubmit, CommentSubmitProvider };
