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
    hideOffer,
    disableOffer,
    companyEnableOffer,
    adminEnableOffer,
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
            technologies: [],
            loading: false,
            error: null });
    });

    it("should set offers when setSearchOffers action is called", () => {
        const state = searchOffersState(
            {
                offers: [],
            },
            setSearchOffers([new Offer({ _id: 1 }), new Offer({ _id: 2 })])
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

    it("should set advanced search technologies when setTechs action is called", () => {
        const state = searchOffersState(
            {
                technologies: [],
            },
            setTechs(["test1", "test2"])
        );

        expect(state.technologies).toStrictEqual(["test1", "test2"]);
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

    describe("Offer Visibility State Reducers", () => {

        let offers;

        beforeEach(() => {
            offers = [
                new Offer({
                    _id: "id1",
                    title: "position1",
                    owner: "company_id",
                    ownerName: "company1",
                    ownerLogo: "",
                    location: "location1",
                    jobStartDate: (new Date()).toISOString(),
                    publishDate: "2021-04-22T22:35:57.177Z",
                    publishEndDate: "2021-09-19T23:00:00.000Z",
                    description: "description1",
                    isHidden: false,
                    hiddenReason: null,
                    adminReason: null,
                }),
                new Offer({
                    _id: "id1",
                    title: "position1",
                    owner: "company_id",
                    ownerName: "company1",
                    ownerLogo: "",
                    location: "location1",
                    jobStartDate: (new Date()).toISOString(),
                    publishDate: "2021-04-22T22:35:57.177Z",
                    publishEndDate: "2021-09-19T23:00:00.000Z",
                    description: "description1",
                    isHidden: true,
                    hiddenReason: "COMPANY_REQUEST",
                    adminReason: null,
                }),
                new Offer({
                    _id: "id1",
                    title: "position1",
                    owner: "company_id",
                    ownerName: "company1",
                    ownerLogo: "",
                    location: "location1",
                    jobStartDate: (new Date()).toISOString(),
                    publishDate: "2021-04-22T22:35:57.177Z",
                    publishEndDate: "2021-09-19T23:00:00.000Z",
                    description: "description1",
                    isHidden: true,
                    hiddenReason: "ADMIN_REQUEST",
                    adminReason: "This offer is offensive",
                }),
            ];
        });

        it("should hide offer when hideOffer action is called", () => {
            const state = searchOffersState(
                {
                    offers: offers,
                },
                hideOffer(0)
            );

            expect(state.offers[0].isHidden).toBe(true);
            expect(state.offers[0].hiddenReason).toBe("COMPANY_REQUEST");
        });

        it("should disable offer when disableOffer action is called", () => {
            const state = searchOffersState(
                {
                    offers: offers,
                },
                disableOffer(0, "This offer is offensive")
            );

            expect(state.offers[0].isHidden).toBe(true);
            expect(state.offers[0].hiddenReason).toBe("ADMIN_REQUEST");
            expect(state.offers[0].adminReason).toBe("This offer is offensive");
        });

        it("should enable offer when companyEnableOffer action is called", () => {
            const state = searchOffersState(
                {
                    offers: offers,
                },
                companyEnableOffer(1)
            );

            expect(state.offers[1].isHidden).toBe(false);
        });

        it("should enable offer when adminEnableOffer action is called", () => {
            const state = searchOffersState(
                {
                    offers: offers,
                },
                adminEnableOffer(2)
            );

            expect(state.offers[2].isHidden).toBe(false);
            expect(state.offers[2].hiddenReason).toBe(null);
            expect(state.offers[2].adminReason).toBe(null);
        });
    });
});
