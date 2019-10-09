export const offerTypes = Object.freeze({
    SET_SEARCH_OFFERS: "SET_SEARCH_OFFERS",
    SET_OFFERS_LOADING: "SET_OFFERS_LOADING",
    SET_SEARCH_OFFERS_ERROR: "SET_SEARCH_OFFERS_ERROR",
});

export const setLoadingOffers = (loading) => ({
    type: offerTypes.SET_OFFERS_LOADING,
    loading,
});

export const setSearchOffers = (offers) => ({
    type: offerTypes.SET_SEARCH_OFFERS,
    offers,
});

export const setOffersFetchError = (error) => ({
    type: offerTypes.SET_SEARCH_OFFERS_ERROR,
    error,
});
