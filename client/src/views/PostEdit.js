import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getPost, updatePost } from '../apiClient.js';
import PostForm from '../components/PostForm.js';

const PostEdit = (props) => {
  let history = useHistory();
  let { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost(id).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  const handleSubmit = (updatedFields) => {
    const newPost = Object.assign(post, updatedFields);
    updatePost(id, newPost).then((response) => history.push(`/post/${id}`));
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
