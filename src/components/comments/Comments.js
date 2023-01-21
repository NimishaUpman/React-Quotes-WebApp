import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const quoteId = params.quoteId;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentsHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  let comments;
  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }
  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No Comments Found.</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onAddComment={addedCommentsHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
