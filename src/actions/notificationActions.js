export const NotificationTypes = {
    ADD_SNACKBAR: "ADD_SNACKBAR",
    REMOVE_SNACKBAR: "REMOVE_SNACKBAR",
    CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
};

export const addSnackbar = (notification) => {

    if (typeof notification.message !== "string" || notification.message.length === 0) {
        throw new Error("Notification must have a message field");
    }

    return {
        type: NotificationTypes.ADD_SNACKBAR,
        notification: {
            key: Date.now() + Math.random(),
            ...notification,
        },
    };
};

export const removeSnackbar = (key) => ({
    type: NotificationTypes.REMOVE_SNACKBAR,
    key,
});

export const closeSnackbar = (key) => ({
    type: NotificationTypes.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});
