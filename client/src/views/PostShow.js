import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPost } from '../apiClient.js';

const PostShow = (props) => {
  let { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost(id).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  return (
    <div>
      <Link to={`/post/${id}/edit`}>
        <button>Edit post</button>
      </Link>

      <h2>{post.title}</h2>
      <div>{post.content}</div>
    </div>
  );
};

export default PostShow;
