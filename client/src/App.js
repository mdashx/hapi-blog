import './App.css';

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './views/Home.js';
import PostEdit from './views/PostEdit.js';
import PostNew from './views/PostNew.js';
import PostShow from './views/PostShow.js';

export default function BlogEditor() {
  return (
    <Router>
      <header>
        <Link to="/">
          <h1>Blog Editor</h1>
        </Link>
      </header>
      <hr />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/new">
            <PostNew />
          </Route>

          <Route path="/post/:id/edit">
            <PostEdit />
          </Route>

          <Route path="/post/:id">
            <PostShow />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
