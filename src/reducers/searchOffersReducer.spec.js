import searchOffersState, { INITIAL_JOB_TYPE } from "./searchOffersReducer";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import {
    setSearchOffers,
    setLoadingOffers,
    setOffersFetchError,
    setSearchValue,
    setJobDuration,
    setJobType,
    setFields,
    setTechs,
    setShowJobDurationSlider,
} from "../actions/searchOffersActions";

describe("Search Offers Reducer", () => {
    it("should correctly initialize search offers state", () => {
        const state = searchOffersState(undefined, {});
        expect(state).toEqual({ searchValue: "",
            jobType: INITIAL_JOB_TYPE,
            jobDuration: [null, null],
            filterJobDuration: false,
            offers: [],
            fields: [],
            techs: [],
            loading: false,
            error: null });
    });

    it("should set offers when setSearchOffers action is called", () => {
        const state = searchOffersState(
            {
                offers: [],
            },
            setSearchOffers([new Offer({ id: 1 }), new Offer({ id: 2 })])
        );

        expect(state.offers[0].id).toBe(1);
        expect(state.offers[1].id).toBe(2);
    });
    it("should set loading when setLoadingOffers action is called", () => {
        const state = searchOffersState(
            {
                loading: false,
            },
            setLoadingOffers(true)
        );

        expect(state.loading).toBe(true);

        const newState = searchOffersState(state, setLoadingOffers(false));
        expect(newState.loading).toBe(false);
    });
    it("should set error when setOffersFetchError action is called", () => {
        const state = searchOffersState(
            {
                error: null,
            },
            setOffersFetchError({ error: "something" })
        );

        expect(state.error).toEqual({ error: "something" });
    });
    it("should set search value when setSearchValue action is called", () => {
        const state = searchOffersState(
            {
                searchValue: "",
            },
            setSearchValue("newVal")
        );

        expect(state.searchValue).toEqual("newVal");
    });
    it("should set job duration when setJobDuration action is called", () => {
        const state = searchOffersState(
            {
                jobDuration: [1, 2],
            },
            setJobDuration(2, 5)
        );

        expect(state.jobDuration).toEqual([2, 5]);
    });
    it("should set job type when setJobType action is called", () => {
        const state = searchOffersState(
            {
                jobType: "",
            },
            setJobType("SUMMER_INTERNSHIP")
        );

        expect(state.jobType).toEqual("SUMMER_INTERNSHIP");
    });
    it("should set advanced search fields when setFields action is called", () => {
        const state = searchOffersState(
            {
                fields: [],
            },
            setFields(["test1", "test2"])
        );

        expect(state.fields).toStrictEqual(["test1", "test2"]);
    });
    it("should set advanced search techs when setTechs action is called", () => {
        const state = searchOffersState(
            {
                techs: [],
            },
            setTechs(["test1", "test2"])
        );

        expect(state.techs).toStrictEqual(["test1", "test2"]);
    });
    it("should set job duration toggle when setJobDurationToggle action is called", () => {
        const state = searchOffersState(
            {
                filterJobDuration: false,
            },
            setShowJobDurationSlider(true)
        );

        expect(state.filterJobDuration).toBe(true);
    });
});
