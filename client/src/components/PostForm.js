import React from 'react';

class PostForm extends React.Component {
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
