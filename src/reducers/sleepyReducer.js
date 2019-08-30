/* istanbul ignore file */
import { exampleTypes } from "../actions/types";
import typeToReducer from "type-to-reducer";

const initialState = {
    done: false,
    waiting: false,
    error: null,
};

export default typeToReducer({
    [exampleTypes.SLEEPY]: {
        PENDING: () => ({
            ...initialState,
            waiting: true,
        }),
        REJECTED: (state, action) => ({
            ...state,
            waiting: false,
            error: action.payload,
        }),
        FULFILLED: (state) => ({
            ...state,
            done: true,
            waiting: false,
        }),
    },
}, initialState);
