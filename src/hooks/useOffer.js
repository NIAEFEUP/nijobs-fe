import useSWR from "swr";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";

import config from "../config";
const { API_HOSTNAME } = config;

export default (id) => {

    const getOffer = async (key) => {

        try {
            const res = await fetch(key, {
                method: "GET",
                credentials: "include",
            });
            const json = await res.json();

            if (!res.ok) {
                throw json.errors;
            }

            return json;

        } catch (error) {
            if (Array.isArray(error)) throw error;
            throw [{ msg: "Unexpected Error. Please try again later." }];
        }

    };

    const { data, error, mutate } = useSWR(`${API_HOSTNAME}/offers/${id}`, getOffer);

    return {
        offer: data ? new Offer(data) : null,
        error,
        loading: !data,
        mutate,
    };

};
