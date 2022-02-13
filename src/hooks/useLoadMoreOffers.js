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

export default ({ offset, setOffset, fetchMoreOffers }) => {

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
        limit: 5,
        ...offerSearch,
    };

    const oldOffers = useSelector((state) => state.offerSearch.offers);
    const initialOffersLoading = useSelector((state) => state.offerSearch.loading);
    const submitNumber = useSelector((state) => state.offerSearch.submitNumber);

    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offers, setOffers] = useState(oldOffers);

    useEffect(() => {
        setOffers(oldOffers);
    }, [oldOffers]);

    useEffect(() => {
        setOffset(0);
        setError(null);
        setLoading(false);
    }, [setOffset, submitNumber]);

    useEffect(() => {

        const fetchOffers = async () => {

            if (!fetchMoreOffers || error) return;

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

                const oldOfferIds = [...oldOffers.map((oldOffer) => oldOffer._id)];
                const newOffers = [...oldOffers];

                offersData.forEach((offerData) => {
                    if (!oldOfferIds.includes(offerData._id))
                        newOffers.push(new Offer(offerData));
                });

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

    }, [dispatch, filters, initialOffersLoading, oldOffers, offset, loading, error, fetchMoreOffers]);


    return { offers, hasMore, loading, error };
};
