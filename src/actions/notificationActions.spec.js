import { notificationTypes, addSnackbar, removeSnackbar } from "./notificationActions";
import { mockRandomMath, mockDateNow } from "../../testUtils";

describe("Notification actions", () => {
    it("should return addSnackbar action if notification has message", () => {
        const RANDOM_VALUE = 0.5;
        const DATE_NOW = 1;

        const originalMathObj = mockRandomMath(RANDOM_VALUE);
        const originalDateNowFn = mockDateNow(DATE_NOW);

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

        expect(addSnackbar(submittedNotification)).toEqual(expectedAction);

        global.Math = originalMathObj;
        Date.now = originalDateNowFn;
    });

    it("should not return addSnackbar action if notification doesn't have message", () => {

        const notification = {};
        expect(() => {
            addSnackbar(notification);
        }).toThrow("Notification must have a message field");

    });

    it("should not return addSnackbar action if notification has empty message", () => {

        const notification = { message: "" };
        expect(() => {
            addSnackbar(notification);
        }).toThrow("Notification must have a message field");

    });

    it("should return removeSnackbar action", () => {
        const key = "key";
        const dispatch = (action) => {
            expect(action).toEqual({ type: notificationTypes.REMOVE_SNACKBAR, key });
        };
        dispatch(removeSnackbar(key));
    });

});
