import * as axios from 'axios';

const baseUrl = '/api';

export const resources = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register'
    },
    SELF: {
        GET: '/self',
        RECORDS: '/self/records'
    },
    USERS: '/users',
    RECORDS: '/records'
};

export const post = (resource, data) => {
    return axios.post(`${baseUrl}${resource}`, data).then(res => res.data).catch(error => Promise.reject(error.response));
};

export const patch = (resource, id, data) => {
    let url = id ? `${baseUrl}${resource}/${id}`: `${baseUrl}${resource}`;

    return axios.patch(url, data)
        .then(res => res.data)
        .catch(error => Promise.reject(error.response));
};

export const deleteMethod = (resource, id) => {
    return axios.delete(`${baseUrl}${resource}/${id}`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(error => Promise.reject(error.response));
};

export const get = (resource, params) => {
    return axios.get(`${baseUrl}${resource}`, {
        params: params
    })
        .then(res => res.data)
        .catch(error =>{
            console.log(error)
        });
};