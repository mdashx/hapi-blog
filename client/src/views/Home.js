import React from 'react';
import { Link } from 'react-router-dom';

import { listAllPosts } from '../apiClient.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    listAllPosts().then((response) => this.setState({ posts: response.data }));
  }

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <li key={post._id}>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </li>
      );
    });
    return (
      <div>
        <p>
          <Link to="/new">
            <button>Create new post</button>
          </Link>
        </p>
        {posts}
      </div>
    );
  }
}

export default Home;
