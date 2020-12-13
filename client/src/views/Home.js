import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { listAllPosts } from '../apiClient.js';

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    listAllPosts().then((response) => setPosts(response.data));
  }, []);

  const postLinks = posts.map((post) => {
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
      {postLinks}
    </div>
  );
};

export default Home;
