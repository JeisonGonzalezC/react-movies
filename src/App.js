import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import client from '../src/config';
import { Movies } from './components/Pages/Movies';
import { MovieSelect } from './components/Movie/MovieSelect';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/movie/:id" component={ MovieSelect } />
            <Route exact path="/">
              <Movies/>
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}
