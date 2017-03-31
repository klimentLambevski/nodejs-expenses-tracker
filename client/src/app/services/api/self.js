import {get, resources} from "../gateway/api";

export const getSelf = () => {
    return get(resources.SELF);
};