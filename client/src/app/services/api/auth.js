import {post, resources} from "../gateway/api";
export const signIn = ({email, password}) => {
    return post(resources.AUTH.LOGIN, {email, password});
};

export const register = ({workingHoursFrom, workingHoursTo, ...rest}) => {
    return post(resources.AUTH.REGISTER, {
        workingHoursFrom: parseInt(workingHoursFrom),
        workingHoursTo: parseInt(workingHoursTo),
        ...rest
    });
};