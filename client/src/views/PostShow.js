import React from 'react';
import { Link } from 'react-router-dom';

import { getPost } from '../apiClient.js';

class PostShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  render() {
    return (
      <div>
        <Link to={`/post/${this.props.id}/edit`}>
          <button>Edit post</button>
        </Link>

        <h2>{this.state.post.title}</h2>
        <div>{this.state.post.content}</div>
      </div>
    );
  }

  getPost() {
    getPost(this.props.id).then((response) =>
      this.setState({ post: response.data })
    );
  }

  componentDidMount() {
    this.getPost();
  }
}

export default PostShow;
