import { setLoadingOffers, setSearchOffers, setOffersFetchError } from "./offerActions";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";

// REMOVE THIS LATER; WHEN THE FETCH CALL IS UNCOMMENTED
// eslint-disable-next-line no-unused-vars
const API_HOSTNAME = "CHANGE ME WHEN WE KNOW BETTER";

// TODO remove this
const redditLogo = require("./reddit-logo.png");
const feupLogo = require("./feup-logo.jpg");
const MOCK_OFFERS = [
    new Offer({
        id: "random uuid1",
        position: "Full-Stack Developer",
        company: {
            name: "Reddit",
            logo: redditLogo,
        },
        location: "San Francisco",
        date: "2019-06",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    }),
    new Offer({
        id: "random uuid2",
        position: "Security Guy",
        company: {
            name: "CICA",
            logo: feupLogo,
        },
        location: "Porto",
        date: "2019-06",
        description: "You won't do much, really...",
    }),
    new Offer({
        id: "random uuid3",
        position: "Frontend Developer",
        company: {
            name: "Sigarra",
            logo: feupLogo,
        },
        location: "Porto",
        date: "2019-06",
        description: "kek",
    }),
];

// REMOVE THIS LATER; WHEN THE FETCH CALL IS UNCOMMENTED
// eslint-disable-next-line no-unused-vars
export const searchOffers = (filters) => (dispatch) => {

    dispatch(setLoadingOffers(true));

    try {
        // const res = await fetch(`${API_HOSTNAME}/api/offers?${parseSearchFiltersToURL(filters)}`, {
        //     method: "GET",
        // });
        // if (!res.ok) {
        //     dispatch(setOffersFetchError({
        //         cause: "BAD_RESPONSE",
        //         error: res.status,
        //     }));
        //     dispatch(setLoadingOffers(false));
        //     // TODO count metrics
        //     return
        // }
        // const json = await res.json();
        // dispatch(fetchOffersSearch(json.offers.map((offerData) => new Offer(offerData))));

        // TODO remove this
        dispatch(setSearchOffers(MOCK_OFFERS));

        dispatch(setLoadingOffers(false));
        // TODO count metrics

    } catch (error) {
        dispatch(setOffersFetchError({
            cause: "NETWORK_FAILURE",
            error,
        }));
        dispatch(setLoadingOffers(false));
        // TODO count metrics
    }

};

export const parseSearchFiltersToURL = (filters) => Object.keys(filters).map((key) => `${key}=${filters[key]}`).join("&");
