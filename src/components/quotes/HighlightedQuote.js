import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { DeleteQuote } from '../../lib/api';

import classes from './HighlightedQuote.module.css';
const HighlightedQuote = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { sendRequest, status, error } = useHttp(DeleteQuote, false);

  const deletionHandler = () => {
    // console.log('delete ' + props.id);
    setIsLoading(true);
    sendRequest(props.id);
    setIsLoading(false);
    history.push('/new-quote');
  };

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

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <figure className={classes.quote}>
        <p>{props.text}</p>
        <figcaption>{props.author}</figcaption>
        <button className={classes.button} onClick={deletionHandler}>
          Delete
        </button>
      </figure>
    </Fragment>
  );
};

export default HighlightedQuote;
