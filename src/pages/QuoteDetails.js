import { Fragment, useEffect, useState, useCallback } from 'react';
import { useParams, Route, NavLink, useRouteMatch } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getSingleQuote } from '../lib/api';

const QuoteDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  const addedCommentsHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  useEffect(() => {
    setIsLoading(true);
    sendRequest(quoteId);
    setIsLoading(false);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found</p>;
  }

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
        id={loadedQuote.id}
      />
      <div className="centered">
        <Route path={match.path} exact>
          <NavLink className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </NavLink>
        </Route>
      </div>
      <Route path={`${match.path}/comments/`}>
        <Comments quote={loadedQuote} onAddComment={addedCommentsHandler} />
        <div className="centered">
          <NavLink className="btn--flat" to={`${match.url}`}>
            Hide Comments
          </NavLink>
        </div>
      </Route>
    </Fragment>
  );
};

export default QuoteDetails;
