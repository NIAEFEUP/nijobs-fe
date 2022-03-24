import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSearchOffers, setSearchQueryToken } from "../../../../actions/searchOffersActions";
import Offer from "../Offer/Offer";
import { parseFiltersToURL } from "../../../../utils";
import config from "../../../../config";
import ErrorTypes from "../../../../utils/ErrorTypes";
import { SearchResultsConstants } from "./SearchResultsUtils";

const { API_HOSTNAME } = config;

export default ({ shouldFetchMoreOffers }) => {

    const dispatch = useDispatch();
    const offerSearch = useSelector(({ offerSearch }) => ({
        queryToken: offerSearch.queryToken,
        value: offerSearch.searchValue,
        jobType: offerSearch.jobType,
        jobMinDuration: offerSearch.jobDuration[0],
        jobMaxDuration: offerSearch.jobDuration[1],
        fields: offerSearch.fields,
        technologies: offerSearch.technologies,
    }));

    const filters = {
        limit: SearchResultsConstants.fetchNewOffersLimit,
        ...offerSearch,
    };

    const offers = useSelector((state) => state.offerSearch.offers);

    const [hasMoreOffers, setHasMoreOffers] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchOffers = async () => {

            try {
                setLoading(true);
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
                const data = await res.json();
                const offersData = data.results;
                const queryToken = data.queryToken;

                const offerIds = [...offers.map((offer) => offer._id)];
                const newOffers = [...offers];

                offersData.forEach((offerData) => {
                    if (!offerIds.includes(offerData._id))
                        newOffers.push(new Offer(offerData));
                });

                setHasMoreOffers(offersData.length > 0);
                dispatch(setSearchOffers(newOffers));
                dispatch(setSearchQueryToken(queryToken));
                setLoading(false);
                setError(null);

            } catch (error) {
                setError({
                    cause: ErrorTypes.NETWORK_FAILURE,
                    error,
                });
                setLoading(false);
                return;
            }
        };

        if (shouldFetchMoreOffers) {
            fetchOffers().catch((error) => {
                setError({
                    cause: ErrorTypes.UNEXPECTED,
                    error,
                });
            });
        }

    }, [dispatch, shouldFetchMoreOffers, filters, loading, offers, hasMoreOffers]);

    return { offers, hasMoreOffers, loading, error };
};
