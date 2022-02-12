import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    setSearchOffers,
} from "../actions/searchOffersActions";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { parseFiltersToURL } from "../utils";
import config from "../config";
import ErrorTypes from "../utils/ErrorTypes";

const { API_HOSTNAME } = config;

export default ({ offset }) => {

    const dispatch = useDispatch();
    const offerSearch = useSelector(({ offerSearch }) => ({
        value: offerSearch.searchValue,
        jobType: offerSearch.jobType,
        jobMinDuration: offerSearch.jobDuration[0],
        jobMaxDuration: offerSearch.jobDuration[1],
        fields: offerSearch.fields,
        technologies: offerSearch.technologies,
    }));

    const filters = {
        offset,
        limit: 3,
        ...offerSearch,
    };

    const oldOffers = useSelector((state) => state.offerSearch.offers);
    const initialOffersLoading = useSelector((state) => state.offerSearch.loading);

    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offers, setOffers] = useState(oldOffers);

    // TODO: Find why I need this
    if (offers.length === 0 && oldOffers.length > 0) {
        setOffers(oldOffers);
    }

    const [counter, setCounter] = useState(0);

    useEffect(() => {

        const fetchOffers = async () => {
            // TODO: solve this
            if (initialOffersLoading || loading || oldOffers?.length === 0 || offset === 0 || counter > 5) return;

            setCounter((counter) => counter + 1);

            try {
                const query = parseFiltersToURL(filters);
                const res = await fetch(`${API_HOSTNAME}/offers?${query}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) {
                    setError({
                        cause: ErrorTypes.BAD_RESPONSE,
                        error: res.status,
                    });
                    setLoading(false);

                    return;
                }
                const offersData = await res.json();
                const newOffers = [
                    ...oldOffers,
                    ...offersData.map((offerData) => new Offer(offerData)),
                ];

                setHasMore(offersData.length > 0);
                dispatch(setSearchOffers(newOffers));
                setOffers(newOffers);
                setLoading(false);
                setError(null);

            } catch (error) {
                setError({
                    cause: ErrorTypes.NETWORK_FAILURE,
                    error,
                });
                setLoading(false);
            }
        };

        fetchOffers().catch((error) => {
            setError({
                cause: ErrorTypes.UNEXPECTED,
                error,
            });
        });

    }, [dispatch, filters, initialOffersLoading, oldOffers, offset, loading, counter, error]);


    return { offers, hasMore, loading, error };
};
