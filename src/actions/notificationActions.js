import { notificationTypes } from "./types";

export const addSnackbar = (notification) => (dispatch) => {

    if (!(typeof notification.message === "string") || !notification.message.length === 0) return;

    dispatch({
        type: notificationTypes.ADD_SNACKBAR,
        notification: {
            key: Date.now() + Math.random(),
            ...notification,
        },
    });
};

export const removeSnackbar = (key) => (dispatch) => {
    dispatch({
        type: notificationTypes.REMOVE_SNACKBAR,
        key,
    });
};
