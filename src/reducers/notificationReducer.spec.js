import notificationsState from "./notificationReducer";
import { addSnackbar, removeSnackbar } from "../actions/notificationActions";

describe("Notifications Reducer", () => {
    it("should correctly initialize notifications state", () => {
        const state = notificationsState(undefined, {});
        expect(state).toEqual({ notifications: [] });
    });

    it("should add notification when addSnackbar action is called", () => {
        const state = notificationsState(
            {
                notifications: [],
            },
            addSnackbar({ message: "notification" })
        );

        expect(state.notifications[0].message).toBe("notification");
    });
    it("should remove notification when removeSnackbar action is called", () => {
        const state = notificationsState(
            {
                notifications: [{ message: "notification" }],
            },
            removeSnackbar()
        );

        expect(state.notifications.length).toBe(0);
    });
});
