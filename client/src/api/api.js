import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const insertUser = payload => api.post(`/user`, payload);

export const insertPost = payload => api.post(`/post`, payload);

export const getUser = (username, password) => api.get(`/users/${username}/${password}`);

export const getUserById = (id) => api.get(`/user/${id}`);

export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);

export const deleteUserById = (id) => api.delete(`/user/${id}`);

export const getAllPosts = () => api.get(`/posts/`);


const apis = {
    insertUser,
    getUser,
    updateUserById,
    deleteUserById,
    getUserById,
    insertPost,
    getAllPosts,
}

export default apis;