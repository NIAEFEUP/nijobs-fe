import { exampleTypes } from '../actions/types';
import typeToReducer from 'type-to-reducer';

const initialState = {
    data: {},
    foo: true,
    waiting: false
};

export default typeToReducer({
    [ exampleTypes.CHANGE_THE_STATE ]: {
      PENDING: () => ({
        ...initialState,
        waiting: true
      }),
      REJECTED: (state, action) => ({
        ...initialState,
        error: action.payload,
      }),
      FULFILLED: (state, action) => ({
        ...initialState,
        foo: false,
        data: action.payload,
      })
    }
  }, initialState);