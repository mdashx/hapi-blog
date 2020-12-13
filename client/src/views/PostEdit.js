import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getPost, updatePost } from '../apiClient.js';
import PostForm from '../components/PostForm.js';

const PostEdit = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost(props.id).then((response) => {
      setPost(response.data);
    });
  }, [props.id]);

  let history = useHistory();

  const handleSubmit = (updatedFields) => {
    const newPost = Object.assign(post, updatedFields);
    updatePost(props.id, newPost).then((response) =>
      history.push(`/post/${props.id}`)
    );
  };

  if (Object.keys(post).length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <PostForm post={post} handleSubmit={handleSubmit} />
      </div>
    );
  }
};

export default PostEdit;
