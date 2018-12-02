import { exampleTypes } from './types';


/**
 * THIS IS JUST FOR TESTING WITHOUT FETCHING A REAL API
 * @param {*} time time to sleep in milliseconds
 */
const sleep = (time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time)

    })
}

const exampleActionFetch = () => {
    return new Promise((resolve, reject) => {
        sleep(2000)
            .then(() => {
                resolve({
                    foo: "bar"
                })
            })
    });
};

export const exampleAction = () => dispatch => {
    dispatch({
        type: exampleTypes.CHANGE_THE_STATE,
        payload: exampleActionFetch()
    })
}