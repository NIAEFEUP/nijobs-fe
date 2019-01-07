import { dogTypes } from '../actions/types';
import typeToReducer from 'type-to-reducer';

const initialState = {
    image_url: "",
    loading: false,
    error: null,
};

export default typeToReducer({
    [dogTypes.GET_RANDOM_DOG]: {
        PENDING: (state) => ({
            ...state,
            loading: true
        }),
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        FULFILLED: (state, action) => ({
            ...state,
            loading: false,
            image_url: action.payload,
        })
    },

    
    [dogTypes.RESET_RANDOM_DOG]: (state, action) => ({
        ...initialState,
    }),

}, initialState);