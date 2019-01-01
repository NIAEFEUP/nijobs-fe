import { notificationTypes } from './types';

export const addSnackbar = notification => dispatch => {
    dispatch({
        type: notificationTypes.ADD_SNACKBAR,
        notification: {
            key: new Date().getTime() + Math.random(),
            ...notification,
        },
    })
};

export const removeSnackbar = key => dispatch => {
    dispatch({
        type: notificationTypes.REMOVE_SNACKBAR,
        key,
    })
};
