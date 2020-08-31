import useSWR from "swr";

import { API_HOSTNAME } from "../config";

export default (params) => {

    const getSession = async (key) => {
        try {
            const res = await fetch(key, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) throw { status: res.status };
            else return (await res.json()).data;

        } catch (e) {
            throw { status: e.status || 500 };
        }
    };

    const { data, error, isValidating, mutate } = useSWR(`${API_HOSTNAME}/auth/me`, getSession, {
        revalidateOnFocus: false,
        initialData: null,
        ...params,
    });

    return {
        data,
        error,
        isValidating,
        reset: () => mutate(null),
        revalidate: () => mutate(`${API_HOSTNAME}/auth/me`),
        isLoggedIn: !!data || false,
    };

};
