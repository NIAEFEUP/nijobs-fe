import { notificationTypes } from "../actions/types";
import typeToReducer from "type-to-reducer";

const initialState = {
    notifications: [],
};

export default typeToReducer({
    [notificationTypes.ADD_SNACKBAR]: (state, action) => ({
        ...state,
        notifications: [
            ...state.notifications,
            {
                ...action.notification,
            },
        ],

    }),

    [notificationTypes.REMOVE_SNACKBAR]: (state, action) => ({
        ...state,
        notifications: state.notifications.filter(
            (notification) => notification.key !== action.key,
        ),
    }),

}, initialState);
