import { notificationTypes } from "./types";

export const addSnackbar = (notification) => {

    if (!(typeof notification.message === "string") || !notification.message.length === 0) {
        throw new Error("Notification must have a message field");
    }

    return {
        type: notificationTypes.ADD_SNACKBAR,
        notification: {
            key: Date.now() + Math.random(),
            ...notification,
        },
    };
};

export const removeSnackbar = (key) => ({
    type: notificationTypes.REMOVE_SNACKBAR,
    key,
});
