import {deleteMethod, get, patch, post, resources} from "../gateway/api";
import * as _ from "lodash";

export const getSelf = () => {
    return get(resources.SELF.GET);
};

export const updateSelf = ({name, lastName}) => {
    return patch(resources.SELF.GET, null,  {
        name,
        lastName
    });
};

export const getSelfRecords = (date, dateTo) => {
    return get(resources.SELF.RECORDS, {date: date.toISOString(), dateTo: dateTo.toISOString()});
};

export const addSelfRecords = ({date, time, description, amount, comment}) => {
    let constructedDate = _.clone(date);
    constructedDate.setHours(time.getHours());
    constructedDate.setMinutes(time.getMinutes());
    constructedDate.setSeconds(0);
    constructedDate.setMilliseconds(0);

    return post(resources.SELF.RECORDS, {date: constructedDate, description, amount, comment});
};

export const addUserRecords = ({id: userId}, {date, time, description, amount, comment}) => {
    let constructedDate = _.clone(date);
    constructedDate.setHours(time.getHours());
    constructedDate.setMinutes(time.getMinutes());
    constructedDate.setSeconds(0);
    constructedDate.setMilliseconds(0);

    return post(`${resources.USERS}/${userId}/${resources.RECORDS}`, {date: constructedDate, description, amount, comment});
};


export const updateSelfRecord = ({id, date, time, description, amount, comment}) => {
    let constructedDate = _.clone(date);
    constructedDate.setHours(time.getHours());
    constructedDate.setMinutes(time.getMinutes());
    constructedDate.setSeconds(0);
    constructedDate.setMilliseconds(0);

    return patch(resources.RECORDS, id, {date: constructedDate, description, amount, comment});
};

export const deleteSelfRecord = (record) => {
    return deleteMethod(resources.RECORDS, record.id);
};