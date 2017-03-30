import {post, resources} from "../gateway/api";
export const signIn = ({email, password}) => {
    return post(resources.AUTH.LOGIN, {email, password});
};