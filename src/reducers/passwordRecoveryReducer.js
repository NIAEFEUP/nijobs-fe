import { PasswordRecoveryActionTypes } from "../actions/passwordRecoveryActions";

const initialState = {
    sendingRequest: false,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case PasswordRecoveryActionTypes.SET_SENDING_REQUEST:
            return {
                ...state,
                sendingRequest: action.sendingRequest,
            };
        default:
            return state;
    }
};
