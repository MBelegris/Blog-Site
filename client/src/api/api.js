import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const insertUser = payload => api.post(`/user`, payload);

export const insertPost = payload => api.post(`/post`, payload);

export const getUser = (username, password) => api.get(`/users/${username}/${password}`);

const apis = {
    insertUser,
    getUser,
    // updateUserById,
    // deleteUserById,
    // getUserById,
    insertPost,
    // getAllPosts,
    // updatePostById,
    // deletePostById,
    // getPostById
}

export default apis;