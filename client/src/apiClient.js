// Connect to the backend

const API_HOST = 'http://localhost:3000';

const axios = require('axios');

export const listAllPosts = () => {
  return axios({
    method: 'get',
    url: `${API_HOST}/post`,
  });
};

export const getPost = (id) => {
  return axios({
    method: 'get',
    url: `${API_HOST}/post/${id}`,
  });
};

export const updatePost = (id, data) => {
  return axios({
    method: 'put',
    url: `${API_HOST}/post/${id}`,
    data,
  });
};

export const createPost = (data) => {
  console.log(data);
  return axios({
    method: 'post',
    url: `${API_HOST}/post/`,
    data,
  });
};
