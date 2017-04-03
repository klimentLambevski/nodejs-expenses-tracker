import {deleteMethod, get, patch, post, resources} from "../gateway/api";

export const getUsers = (roles) => {
    return get(resources.USERS, {roles});
};

export const createUser = ({workingHoursFrom, workingHoursTo, ...rest}) => {
    return post(resources.USERS, {
        workingHoursFrom: parseInt(workingHoursFrom),
        workingHoursTo: parseInt(workingHoursTo),
        ...rest
    });
};

export const updateUser = ({workingHoursFrom, workingHoursTo, name, lastName, id, role}) => {
    return patch(resources.USERS, id, {
        workingHoursFrom: parseInt(workingHoursFrom),
        workingHoursTo: parseInt(workingHoursTo),
        name,
        lastName,
        role
    });
};

export const deleteUser = ({id}) => {
    return deleteMethod(resources.USERS, id);
};

export const getUserRecords = (user, date, dateTo) => {
    return get(`${resources.USERS}/${user.id}${resources.RECORDS}`, {date: date.toISOString(), dateTo: dateTo && dateTo.toISOString()})
};

export const deleteRecord = (user, record) => {
    return deleteMethod(`${resources.USERS}/${user.id}${resources.RECORDS}`, record.id);
};