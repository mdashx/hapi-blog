import React from 'react';
import { useHistory } from 'react-router-dom';

import { createPost } from '../apiClient.js';
import PostForm from '../components/PostForm.js';

const PostNew = (props) => {
  let history = useHistory();

  const handleSubmit = (newPost) => {
    createPost(newPost).then((response) => {
      history.push(`/post/${response.data._id}`);
    });
  };

  return (
    <div>
      <PostForm post={{ title: '', content: '' }} handleSubmit={handleSubmit} />
    </div>
  );
};

export default PostNew;
