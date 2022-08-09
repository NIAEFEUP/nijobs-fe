export const PasswordRecoveryActionTypes = {
    SET_SENDING_REQUEST: "SET_SENDING_REQUEST",
};

export const setSendingRequest = (sendingRequest) => ({
    type: PasswordRecoveryActionTypes.SET_SENDING_REQUEST,
    sendingRequest,
});
