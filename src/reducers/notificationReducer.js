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

        default:
            return state;
    }
};
