import { createTheme } from "@material-ui/core";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { renderWithStoreAndTheme, fireEvent } from "../../../../test-utils";
import Offer from "./Offer";
import OfferWidget from "./OfferWidget";
import useChipsFieldSearch from "./useChipsFieldSearch";

jest.mock("./useChipsFieldSearch");
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe("useChipsFieldSearch", () => {
    const theme = createTheme({});


    const offer = new Offer({
        _id: "id1",
        title: "position1",
        owner: "company_id",
        ownerName: "company1",
        ownerLogo: "",
        location: "location1",
        fields: ["BACKEND"],
        technologies: ["Cassandra"],
        jobMinDuration: 1,
        jobMaxDuration: 12,
        jobStartDate: (new Date()).toISOString(),
        publishDate: "2021-04-22T22:35:57.177Z",
        publishEndDate: "2021-09-19T23:00:00.000Z",
        isPaid: false,
        vacancies: 2,
        description: "description1",
    });


    it("should redirect and update field filter state if in page", async () => {
        const addFieldMock = jest.fn();
        useChipsFieldSearch.mockImplementation(() => ({
            addField: addFieldMock,
            setLoadUrlFromFilters: jest.fn(),
        }));

        const initialState = {
            offerSearch: {
                searchValue: "searchValue",
                jobDuration: [1, 2],
                fields: [],
                technologies: [],
            },
        };


        const wrapper = renderWithStoreAndTheme(
            <MemoryRouter initialEntries={["/"]}>
                <OfferWidget offer={offer} isPage={true} />
            </MemoryRouter>,
            { initialState, theme }
        );

        await fireEvent.click(wrapper.getByText("Back-End"));

        expect(mockHistoryPush).toHaveBeenCalledWith("/");
        expect(addFieldMock).toHaveBeenCalledWith("BACKEND");
    });

    it("should update field filter and url if in search page", async () => {
        const addFieldWithUrlMock = jest.fn();

        useChipsFieldSearch.mockImplementation(() => ({
            addFieldWithUrl: addFieldWithUrlMock,
        }));

        const initialState = {
            offerSearch: {
                searchValue: "searchValue",
                jobDuration: [1, 2],
                fields: [],
                technologies: [],
            },
        };


        const wrapper = renderWithStoreAndTheme(
            <MemoryRouter initialEntries={["/"]}>
                <OfferWidget offer={offer} isPage={false} />
            </MemoryRouter>,
            { initialState, theme }
        );

        await fireEvent.click(wrapper.getByText("Back-End"));

        expect(addFieldWithUrlMock).toHaveBeenCalledWith("BACKEND");
    });

    it("should redirect and update techs filter state if in page", async () => {
        const addTechMock = jest.fn();
        useChipsFieldSearch.mockImplementation(() => ({
            addTech: addTechMock,
            setLoadUrlFromFilters: jest.fn(),
        }));

        const initialState = {
            offerSearch: {
                searchValue: "searchValue",
                jobDuration: [1, 2],
                fields: [],
                technologies: [],
            },
        };


        const wrapper = renderWithStoreAndTheme(
            <MemoryRouter initialEntries={["/"]}>
                <OfferWidget offer={offer} isPage={true} />
            </MemoryRouter>,
            { initialState, theme }
        );

        await fireEvent.click(wrapper.getByText("Cassandra"));

        expect(mockHistoryPush).toHaveBeenCalledWith("/");
        expect(addTechMock).toHaveBeenCalledWith("Cassandra");
    });

    it("should update techs filter and url if in search page", async () => {
        const addTechWithUrlMock = jest.fn();

        useChipsFieldSearch.mockImplementation(() => ({
            addTechWithUrl: addTechWithUrlMock,
        }));

        const initialState = {
            offerSearch: {
                searchValue: "searchValue",
                jobDuration: [1, 2],
                fields: [],
                technologies: [],
            },
        };


        const wrapper = renderWithStoreAndTheme(
            <MemoryRouter initialEntries={["/"]}>
                <OfferWidget offer={offer} isPage={false} />
            </MemoryRouter>,
            { initialState, theme }
        );

        await fireEvent.click(wrapper.getByText("Cassandra"));

        expect(addTechWithUrlMock).toHaveBeenCalledWith("Cassandra");
    });
});
