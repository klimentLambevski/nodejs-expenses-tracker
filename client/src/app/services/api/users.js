import {get, post, resources} from "../gateway/api";

export const getUsers = () => {
    return get(resources.USERS);
};