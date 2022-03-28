import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
    resetOffersFetchError,
    setLoadingOffers,
    setOffersFetchError,
    setSearchOffers,
    setSearchQueryToken,
} from "../../../../actions/searchOffersActions";
import {
    searchOffers,
    BadResponseException,
    NetworkFailureException,
} from "../../../../services/offerService";

export default (filters) => {

    const dispatch = useDispatch();

    // TODO: Move this to redux!!!
    const [hasMoreOffers, setHasMoreOffers] = useState(true);
    const [moreOffersFetchError, setMoreOffersFetchError] = useState(null);
    const [moreOffersLoading, setMoreOffersLoading] = useState(false);

    // isInitialRequest = true on the first time the search request is made
    // the following request will have isInitialRequest = false
    const loadOffers = useCallback((isInitialRequest) => async (queryToken, limit) => {

        if (isInitialRequest) {
            dispatch(resetOffersFetchError());
            dispatch(setLoadingOffers(true));
            setHasMoreOffers(true);
        } else {
            if (!hasMoreOffers) return;

            setMoreOffersFetchError(null);
            setMoreOffersLoading(true);
        }

        try {
            const { updatedQueryToken, results } = await searchOffers({ queryToken, limit, ...filters });
            dispatch(setSearchQueryToken((updatedQueryToken)));
            dispatch(setSearchOffers(results, !isInitialRequest));

            if (results.length === 0) setHasMoreOffers(false);

            if (isInitialRequest) {
                dispatch(setLoadingOffers(false));
            } else {
                setMoreOffersLoading(false);
            }

        } catch (e) {
            if (e instanceof BadResponseException) {
                if (isInitialRequest) {
                    dispatch(setOffersFetchError(e.error));
                    dispatch(setLoadingOffers(false));
                } else {
                    setMoreOffersFetchError(e.error);
                    setMoreOffersLoading(false);
                }
            } else if (e instanceof NetworkFailureException) {
                if (isInitialRequest) {
                    dispatch(setOffersFetchError(e.error));
                    dispatch(setLoadingOffers(false));
                } else {
                    setMoreOffersFetchError(e.error);
                    setMoreOffersLoading(false);
                }
            }
        }

    }, [dispatch, filters, hasMoreOffers]);

    return {
        search: (...args) => loadOffers(true)(null, ...args),
        loadMoreOffers: (queryToken, ...args) => loadOffers(false)(queryToken, ...args),
        moreOffersLoading,
        moreOffersFetchError,
    };
};
