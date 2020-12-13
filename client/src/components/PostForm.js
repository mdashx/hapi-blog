import React, { useEffect, useState } from 'react';

const PostForm = (props) => {
  const [post, setPost] = useState({
    title: props.post.title,
    content: props.post.content,
  });

  const handleChange = (event) => {
    const newPost = Object.assign({}, post);
    newPost[event.target.dataset.key] = event.target.value;
    setPost(newPost);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(post);
  };

  return (
    <form onSubmit={handleSubmit}>
      Title:
      <br />
      <input
        type="text"
        value={post.title}
        data-key="title"
        onChange={handleChange}
      />
      <br />
      Content:
      <br />
      <textarea
        value={post.content}
        onChange={handleChange}
        data-key="content"
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

class PostFormOld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.post.title,
      content: this.props.post.content,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const updatedState = {};
    updatedState[event.target.dataset.key] = event.target.value;
    this.setState(updatedState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Title:
        <br />
        <input
          type="text"
          value={this.state.title}
          data-key="title"
          onChange={this.handleChange}
        />
        <br />
        Content:
        <br />
        <textarea
          value={this.state.content}
          onChange={this.handleChange}
          data-key="content"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PostForm;
