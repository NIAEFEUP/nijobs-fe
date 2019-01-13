import { exampleTypes } from './types';
import { addSnackbar } from './notificationActions';

/**
 * THIS IS JUST FOR TESTING ASYNC WITHOUT FETCHING A REAL API
 * @param {*} time time to sleep in milliseconds
 */
const sleep = (time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

const exampleActionFetch = () => {
    return new Promise(async (resolve) => {
        await sleep(2000);
        return resolve();
    });
};

export const exampleAction = () => dispatch => {
    const first = dispatch({
        type: exampleTypes.SLEEPY,
        payload: exampleActionFetch(),
    });

    first.then(() => {
        dispatch(addSnackbar({
            message: "Hello!",
            options: {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        }));
    });
};