import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";


import config from "../config";
const { API_HOSTNAME } = config;


// TODO remove this
const redditLogo = require("./reddit-logo.png");

// eslint-disable-next-line no-unused-vars
const MOCK_OFFERS = [
    new Offer({
        id: "random uuid1",
        title: "Full-Stack Developer",
        ownerName: "Reddit",
        ownerLogo: redditLogo,
        company: {
            name: "Reddit",
            logo: redditLogo,
        },
        location: "San Francisco",
        publishDate: "2019-06",
        publishEndDate: "2021-09",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    }),
    new Offer({
        id: "random uuid2",
        title: "Security Guy",
        ownerName: "Reddit",
        ownerLogo: redditLogo,
        location: "Porto",
        publishDate: "2019-06",
        publishEndDate: "2021-09",
        description: "You won't do much, really...",
    }),
    new Offer({
        id: "random uuid3",
        title: "Frontend Developer But Make it Longer",
        ownerName: "Reddit",
        ownerLogo: redditLogo,
        location: "Porto",
        publishDate: "2019-06",
        publishEndDate: "2021-09",
        description: "kek",
    }),
    new Offer({
        id: "random uuid4",
        title: "Guy in the background",
        ownerName: "Reddit",
        ownerLogo: redditLogo,
        location: "Porto",
        publishDate: "2019-06",
        publishEndDate: "2021-09",
        description: "kek",
    }),
    new Offer({
        id: "random uuid5",
        title: "Janitor",
        ownerName: "Reddit",
        ownerLogo: redditLogo,
        location: "Porto",
        publishDate: "2019-06",
        publishEndDate: "2021-09",
        description: "kek",
    }),
    new Offer({
        id: "random uuid6",
        title: "Fullstack developer but make it shorter",
        ownerName: "Reddit",
        ownerLogo: redditLogo,
        location: "Porto",
        publishDate: "2019-06",
        publishEndDate: "2021-09",
        description: "kek",
    }),
];

// REMOVE THIS LATER; WHEN THE FETCH CALL IS UNCOMMENTED
// eslint-disable-next-line no-unused-vars

const parseFiltersToURL = (filters) => Object.keys(filters).map((key) => `${key}=${filters[key]}`).join("&");

export const fetchCompanyOffers = async (companyID, filters) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/company/${companyID}${filters ? `?${parseFiltersToURL(filters)}` : ""}`, {
            method: "GET",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }
        // TODO count metrics
        return json;

    } catch (error) {
        // TODO count metrics
        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error" }];
    }

    // throw new Error("An error occurred!");

    // return MOCK_OFFERS;
};
