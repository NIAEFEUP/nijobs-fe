export const CreateOfferActionTypes = {
    SET_SENDING_CREATE_OFFER: "SET_SENDING_CREATE_OFFER",
    SET_CREATE_OFFER: "SET_CREATE_OFFER",
    SET_CREATE_OFFER_SUBMISSION_ERROR: "SET_CREATE_OFFER_SUBMISSION_ERROR",
};

export const setCreateOffer = (createOffer) => ({
    type: CreateOfferActionTypes.SET_CREATE_OFFER,
    createOffer,
});

export const setCreateOfferSending = (sendingOffer) => ({
    type: CreateOfferActionTypes.SET_SENDING_CREATE_OFFER,
    sendingOffer,
});

export const setCreateOfferSubmissionError = (errors) => ({
    type: CreateOfferActionTypes.SET_CREATE_OFFER_SUBMISSION_ERROR,
    errors,
});
