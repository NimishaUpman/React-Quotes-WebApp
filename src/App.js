import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'));
  const NewQuote = React.lazy(() => import('./pages/NewQuote'));
  const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
  const NotFound = React.lazy(() => import('./pages/NotFound'));

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetails />
          </Route>
          <Route path="/quotes">
            <AllQuotes />
          </Route>
          <Route path="/new-quote" exact>
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
