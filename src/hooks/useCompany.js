import useSWR from "swr";
import Constants from "../utils/Constants";
import { useMemo } from "react";

import config from "../config";
const { API_HOSTNAME } = config;

export default (id) => {
    const getCompany = async (key) => {
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
            throw [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];
        }
    };

    const { data, error, mutate } = useSWR(`${API_HOSTNAME}/company/${id}`, getCompany);
    const company = useMemo(() => data ? data.company : null, [data]);

    return {
        company,
        error,
        loading: !data,
        mutate,
    };
};
