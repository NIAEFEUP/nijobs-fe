/* istanbul ignore file */
import { addSnackbar } from "./notificationActions";
export const exampleTypes = Object.freeze({
    SLEEPY: "SLEEPY",
});

/**
 * THIS IS JUST FOR TESTING ASYNC WITHOUT FETCHING A REAL API
 * @param {*} time time to sleep in milliseconds
 */
export const sleep = (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, time);
});

const exampleFetch = async () => {
    await sleep(2000);
    return;
};

export const exampleServiceCall = () => (dispatch) => {
    const first = dispatch({
        type: exampleTypes.SLEEPY,
        payload: exampleFetch(),
    });

    first.then(() => {
        dispatch(addSnackbar({
            message: "Hello!",
            options: {
                variant: "info",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
            },
        }));
    });
};
