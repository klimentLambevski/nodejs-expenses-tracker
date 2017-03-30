import * as _ from 'lodash';
import * as axios from 'axios';

const baseUrl = '/api';

export const resources = {
    AUTH: {
        LOGIN: '/auth/login'
    }
};

console.log(resources);

export const post = (resource, data) => {
    return axios.post(`${baseUrl}${resource}`, data);
};