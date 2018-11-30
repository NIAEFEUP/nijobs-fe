import { exampleTypes } from '../actions/types';

const initialState = {
    data: {},
    foo: false
};

export default (state = initialState, action) => {
    switch(action.type){
    case exampleTypes.CHANGE_THE_STATE:
        return {
            ...state,
            foo: true,
            data: action.payload.data
        };
    default:
        return state; 
    }
};