import * as actions from "./notificationActions";
import { notificationTypes } from "./types";

describe("Notification actions", () => {
    it("should return addSnackbar action if notification has message", () => {
        const RANDOM_VALUE = 0.5;
        const DATE_NOW = 1;

        const mockMath = Object.create(global.Math);
        mockMath.random = () => RANDOM_VALUE;
        global.Math = mockMath;
        Date.now = jest.fn().mockReturnValue(DATE_NOW);

        const submittedNotification = {
            message: "message",
        };

        const expectedAction = {
            type: notificationTypes.ADD_SNACKBAR,
            notification: {
                key: DATE_NOW + RANDOM_VALUE,
                message: "message",
            },
        };

        expect(actions.addSnackbar(submittedNotification)).toEqual(expectedAction);
    });

    it("should not return addSnackbar action if notification doesn't have message", () => {

        const notification = {};
        expect(() => {
            actions.addSnackbar(notification);
        }).toThrow("Notification must have a message field");

    });

    it("should not return addSnackbar action if notification has empty message", () => {

        const notification = { message: "" };
        expect(() => {
            actions.addSnackbar(notification);
        }).toThrow("Notification must have a message field");

    });

    it("should return removeSnackbar action", () => {
        const key = "key";
        const dispatch = (action) => {
            expect(action).toEqual({ type: notificationTypes.REMOVE_SNACKBAR, key });
        };
        dispatch(actions.removeSnackbar(key));
    });

});
