import { notificationTypes } from "../actions/notificationActions";

const initialState = {
    notifications: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case notificationTypes.ADD_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        ...action.notification,
                    },
                ],
            };
        case notificationTypes.REMOVE_SNACKBAR:
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
