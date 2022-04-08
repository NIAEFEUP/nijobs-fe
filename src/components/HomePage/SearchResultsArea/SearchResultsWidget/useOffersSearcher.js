import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const searchQueryToken = useSelector((state) => state.offerSearch.queryToken);

    const [hasMoreOffers, setHasMoreOffers] = useState(true);
    const [moreOffersFetchError, setMoreOffersFetchError] = useState(null);
    const [moreOffersLoading, setMoreOffersLoading] = useState(false);

    // The "search" and "loadMoreOffers" functions do not share the same state;
    // When we run "setHasMoreOffers(false)" on the "loadMoreOffers" function,
    // the "search" function does not know that the "hasMoreOffers" variable has changed;
    // In the same way, when we run "setHasMoreOffers(true) on the "search" function,
    // the "loadMoreOffers" function does not know that the "hasMoreOffers" variable has changed;
    // Then, when the "loadMoreOffers" function is executed after a previous execution where the
    // "hasMoreOffers" variable became "false", the state of this variable is still false, which
    // prevents the fetching of new offers.
    // Knowing that, I needed a way to set the "hasMoreOffers" variable to "true" when the previous fact
    // happens: setting the "hasMoreOffers" to true when the "queryToken" (which is stored in redux) changes
    useEffect(() => {
        setHasMoreOffers(true);
    }, [searchQueryToken]);

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

            dispatch(setSearchQueryToken(updatedQueryToken));
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
