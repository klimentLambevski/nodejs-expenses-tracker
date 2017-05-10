import {post, resources} from "../gateway/api";
export const signIn = ({email, password, captcha}) => {
    return post(resources.AUTH.LOGIN, {email, password, captcha});
};

export const register = ({...rest}) => {
    return post(resources.AUTH.REGISTER, {
        ...rest
    });
};

export const activate = (activationId) =>
    post(resources.AUTH.ACTIVATE, {activationId});