import useSWR from "swr";

// TODO, change this to use the one defined in index.js coming from .env
import { API_HOSTNAME } from "../config";

export default () => {

    // eslint-disable-next-line max-len
    const getSession = () => ({ name: "CompanyName", email: "emailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemail@comom.com" });

    // const getSession = async (key) => {
    //     const res = await fetch(key, {
    //         method: "GET",
    //         credentials: "include",
    //     });

    //     if (!res.ok) {
    //         if (res.status === 401) return {};
    //         throw { status: res.status };
    //     } else return (await res.json()).data;
    // };

    const { data, error, isValidating, mutate } = useSWR(`${API_HOSTNAME}/auth/me`, getSession, {
        revalidateOnFocus: false,
        initialData: null,
    });

    return {
        data,
        error,
        isValidating,
        reset: () => mutate(null),
        revalidate: () => mutate(`${API_HOSTNAME}/auth/me`),
        isLoggedIn: (data && Object.keys(data).length !== 0) || false,
    };

};
