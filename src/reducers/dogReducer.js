/* istanbul ignore file */
import { dogTypes } from "../actions/dogActions";

const initialState = {
    imageUrl: "",
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case dogTypes.GET_RANDOM_DOG_PENDING:
            return {
                ...state,
                loading: true,
            };
        case dogTypes.GET_RANDOM_DOG_REJECTED:
            return {
                ...state,
                error: action.payload,
            };
        case dogTypes.GET_RANDOM_DOG_FULFILLED:
            return {
                ...state,
                loading: false,
                imageUrl: action.payload,
            };
        case dogTypes.RESET_RANDOM_DOG:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
