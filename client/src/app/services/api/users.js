import {deleteMethod, get, patch, post, resources} from "../gateway/api";

export const getUsers = (roles) => {
    return get(resources.USERS, {roles});
};

export const createUser = ({...rest}) => {
    return post(resources.USERS, {
        ...rest
    });
};

export const updateUser = ({name, lastName, id, role}) => {
    return patch(resources.USERS, id, {
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

export const unblockUser = ({id}) =>
    post(`${resources.USERS}/${id}/unblock`);

export const inviteMember = (email) =>
    post(`${resources.USERS}/invite`, {email});

export const completeInvitation = ({activationId, name, lastName, email, password, password_repeat}) =>
    post(`${resources.USERS}/${activationId}/complete-invitation`, {name, lastName, email, password, password_repeat});