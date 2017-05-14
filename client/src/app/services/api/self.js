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

export const getSelfRecords = (date, dateTo, search) => {
    return get(resources.SELF.RECORDS, {date: date.toISOString(), dateTo: dateTo.toISOString(), search});
};

export const addSelfRecords = ({name, date, time, description, amount, comment}) => {
    let constructedDate = _.clone(date);
    constructedDate.setHours(time.getHours());
    constructedDate.setMinutes(time.getMinutes());
    constructedDate.setSeconds(0);
    constructedDate.setMilliseconds(0);

    return post(resources.SELF.RECORDS, {name, date: constructedDate, description, amount, comment});
};

export const addUserRecords = ({id: userId}, {name, date, time, description, amount, comment}) => {
    let constructedDate = _.clone(date);
    constructedDate.setHours(time.getHours());
    constructedDate.setMinutes(time.getMinutes());
    constructedDate.setSeconds(0);
    constructedDate.setMilliseconds(0);

    return post(`${resources.USERS}/${userId}/${resources.RECORDS}`, {name, date: constructedDate, description, amount, comment});
};


export const updateSelfRecord = ({id, name, date, time, description, amount, comment}) => {
    let constructedDate = _.clone(date);
    constructedDate.setHours(time.getHours());
    constructedDate.setMinutes(time.getMinutes());
    constructedDate.setSeconds(0);
    constructedDate.setMilliseconds(0);

    return patch(resources.RECORDS, id, {name, date: constructedDate, description, amount, comment});
};

export const deleteSelfRecord = (record) => {
    return deleteMethod(resources.RECORDS, record.id);
};