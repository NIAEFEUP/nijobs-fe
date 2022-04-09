import { NotificationTypes } from "../actions/notificationActions";

const initialState = {
    notifications: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case NotificationTypes.ADD_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        ...action.notification,
                    },
                ],
            };
        case NotificationTypes.REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.key !== action.key,
                ),
            };
        case NotificationTypes.CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map((notification) => (
                    (action.dismissAll || notification.key === action.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            };
        default:
            return state;
    }
};
