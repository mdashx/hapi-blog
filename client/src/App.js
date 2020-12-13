import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

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
            <EditPost />
          </Route>

          <Route path="/post/:id">
            <ShowPost />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const ShowPost = () => {
  let { id } = useParams();
  return <PostShow id={id} />;
};

const EditPost = () => {
  let { id } = useParams();
  return <PostEdit id={id} />;
};
