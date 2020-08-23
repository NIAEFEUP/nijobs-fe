import {
    offerSearchTypes,
    setLoadingOffers,
    setSearchValue,
    setSearchOffers,
    setJobDuration,
    setJobType,
    resetAdvancedSearchFields,
    setOffersFetchError,
} from "./searchOffersActions";

import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../reducers/searchOffersReducer";

describe("Search Offers actions", () => {
    it("should return Loading Offers action", () => {

        const expectedActionLoading = {
            type: offerSearchTypes.SET_OFFERS_LOADING,
            loading: true,
        };
        const expectedActionNotLoading = {
            type: offerSearchTypes.SET_OFFERS_LOADING,
            loading: false,
        };

        expect(setLoadingOffers(true)).toEqual(expectedActionLoading);
        expect(setLoadingOffers(false)).toEqual(expectedActionNotLoading);
    });

    it("should return Set Search Offers action", () => {

        const offers = ["offer1", "offer2"];
        const expectedAction = {
            type: offerSearchTypes.SET_OFFERS_SEARCH_RESULT,
            offers,
        };

        expect(setSearchOffers(offers)).toEqual(expectedAction);
    });

    it("should return Set Search Value action", () => {

        const value = "search_val";
        const expectedAction = {
            type: offerSearchTypes.SET_SEARCH_VALUE,
            value,
        };

        expect(setSearchValue(value)).toEqual(expectedAction);
    });

    it("should return Set Job Duration action", () => {

        const jobDuration = [1, 2];
        const expectedAction = {
            type: offerSearchTypes.SET_JOB_DURATION,
            jobDuration,
        };

        expect(setJobDuration(...jobDuration)).toEqual(expectedAction);
    });

    it("should return Set Job Type action", () => {

        const jobType = "JOB_TYPE";
        const expectedAction = {
            type: offerSearchTypes.SET_JOB_TYPE,
            jobType,
        };

        expect(setJobType(jobType)).toEqual(expectedAction);
    });

    it("should return Set Offers Fetch Error action", () => {

        const error = "error";
        const expectedAction = {
            type: offerSearchTypes.SET_SEARCH_OFFERS_ERROR,
            error,
        };

        expect(setOffersFetchError(error)).toEqual(expectedAction);
    });

    it("should reset the advanced search fields", () => {

        const dispatch = jest.fn();

        const setJobTypeAction = {
            type: offerSearchTypes.SET_JOB_TYPE,
            jobType: INITIAL_JOB_TYPE,
        };
        const setJobDurationAction = {
            type: offerSearchTypes.SET_JOB_DURATION,
            jobDuration: [INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1],
        };

        resetAdvancedSearchFields()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(setJobTypeAction);
        expect(dispatch).toHaveBeenCalledWith(setJobDurationAction);
    });
});
