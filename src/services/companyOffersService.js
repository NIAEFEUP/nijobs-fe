import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";


// import config from "../config";
// const { API_HOSTNAME } = config;


// TODO remove this
const redditLogo = require("./reddit-logo.png");

// eslint-disable-next-line no-unused-vars
const MOCK_OFFERS = [
    new Offer({
        _id: "random uuid1",
        title: "Full-Stack Developer",
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
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    }),
    new Offer({
        _id: "random uuid2",
        title: "Security Guy",
        company: {
            name: "Reddit",
            logo: redditLogo,
        },
        location: "Porto",
        date: "2019-06",
        description: "You won't do much, really...",
    }),
    new Offer({
        _id: "random uuid3",
        title: "Frontend Developer But Make it Longer",
        company: {
            name: "Reddit",
            logo: redditLogo,
        },
        location: "Porto",
        date: "2019-06",
        description: "kek",
    }),
    new Offer({
        _id: "random uuid4",
        title: "Guy in the background",
        company: {
            name: "Reddit",
            logo: redditLogo,
        },
        location: "Porto",
        date: "2019-06",
        description: "kek",
    }),
    new Offer({
        _id: "random uuid5",
        title: "Janitor",
        company: {
            name: "Reddit",
            logo: redditLogo,
        },
        location: "Porto",
        date: "2019-06",
        description: "kek",
    }),
    new Offer({
        _id: "random uuid6",
        title: "Fullstack developer but make it shorter",
        company: {
            name: "Reddit",
            logo: redditLogo,
        },
        location: "Porto",
        date: "2019-06",
        description: "kek",
    }),
];

const sleep = (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, time);

});

// REMOVE THIS LATER; WHEN THE FETCH CALL IS UNCOMMENTED
// eslint-disable-next-line no-unused-vars
export const fetchCompanyOffers = async (filters) => {
    /*
    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/search${filters ? `?${encodeFilters(filters)}` : ""}`, {
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
    */
    await sleep(1000);
    // throw new Error("An error occurred!");
    return MOCK_OFFERS;
};
