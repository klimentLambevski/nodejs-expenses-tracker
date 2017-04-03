import {deleteMethod, get, patch, post, resources} from "../gateway/api";

export const getSelf = () => {
    return get(resources.SELF.GET);
};

export const updateSelf = ({workingHoursFrom, workingHoursTo, name, lastName}) => {
    return patch(resources.SELF.GET, null,  {
        workingHoursFrom: parseInt(workingHoursFrom),
        workingHoursTo: parseInt(workingHoursTo),
        name,
        lastName
    });
};

export const getSelfRecords = (date) => {
    return get(resources.SELF.RECORDS, {date: date.toISOString()});
};

export const addSelfRecords = ({fromDate, toDate, notes}) => {
    return post(resources.SELF.RECORDS, {workedFrom: fromDate.toISOString(), workedTo: toDate.toISOString(), notes});
};

export const deleteSelfRecord = (record) => {
    return deleteMethod(resources.SELF.RECORDS, record.id);
};