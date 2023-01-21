import { useRef, useEffect } from 'react';

import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddComment } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddComment();
    }
  }, [status, onAddComment, error]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const EnteredText = commentTextRef.current.value;
    sendRequest({
      commentData: {
        text: EnteredText,
      },
      quoteid: props.quoteId,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
