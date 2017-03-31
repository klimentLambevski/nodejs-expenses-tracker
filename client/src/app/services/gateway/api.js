import * as _ from 'lodash';
import * as axios from 'axios';

const baseUrl = '/api';

export const resources = {
    AUTH: {
        LOGIN: '/auth/login'
    },
    SELF: '/self'
};

export const post = (resource, data) => {
    return axios.post(`${baseUrl}${resource}`, data).then(res => res.data);
};

export const get = (resource, params) => {
    return axios.get(`${baseUrl}${resource}`, {
        params: params
    }).then(res => res.data);
};