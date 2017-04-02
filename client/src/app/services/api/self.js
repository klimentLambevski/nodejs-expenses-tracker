import {get, post, resources} from "../gateway/api";

export const getSelf = () => {
    return get(resources.SELF.GET);
};

export const getSelfRecords = (date) => {
    return get(resources.SELF.RECORDS, {date: date.toISOString()});
};

export const addSelfRecords = ({fromDate, toDate}) => {
    return post(resources.SELF.RECORDS, {workedFrom: fromDate.toISOString(), workedTo: toDate.toISOString()});
};