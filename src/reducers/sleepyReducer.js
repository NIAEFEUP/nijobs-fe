/* istanbul ignore file */
import { exampleTypes } from "../actions/sleepyService";

const initialState = {
    done: false,
    waiting: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case exampleTypes.SLEEPY_PENDING:
            return {
                ...initialState,
                waiting: true,
            };
        case exampleTypes.SLEEPY_REJECTED:
            return {
                ...state,
                waiting: false,
                error: action.payload,
            };
        case exampleTypes.SLEEPY_FULFILLED:
            return {
                ...state,
                done: true,
                waiting: false,
            };

        default:
            return state;
    }
};
