import { exampleTypes } from '../actions/types';

const initialState = {
    data: {},
    foo: true,
    waiting: false
};

export default (state = initialState, action) => {
    switch(action.type){
    case `${exampleTypes.CHANGE_THE_STATE}_PENDING`:
        return {
            ...state,
            waiting: true,
            data: action.payload
        };
    case `${exampleTypes.CHANGE_THE_STATE}_FULFILLED`:
        return {
            ...state,
            foo: false,
            waiting: false,
            data: action.payload
        };
    default:
        return state; 
    }
};