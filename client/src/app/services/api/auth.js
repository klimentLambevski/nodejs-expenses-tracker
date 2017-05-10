import {post, resources} from "../gateway/api";
export const signIn = ({email, password}) => {
    return post(resources.AUTH.LOGIN, {email, password});
};

export const register = ({...rest}) => {
    return post(resources.AUTH.REGISTER, {
        ...rest
    });
};

export const activate = (activationId) =>
    post(resources.AUTH.ACTIVATE, {activationId});