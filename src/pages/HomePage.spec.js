import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import HomePage from "./HomePage";
import MainView from "../components/HomePage/MainView";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import SearchResultsWidget from "../components/HomePage/SearchResultsArea/SearchResultsWidget/SearchResultsWidget";

describe("HomePage", () => {
    describe("render", () => {
        const wrapper = shallow(<HomePage/>);

        it("should render MainView", () => {
            expect(wrapper.find(MainView).exists()).toBe(true);
        });

        it("should render ProductDescription", () => {
            expect(wrapper.find(ProductDescription).exists()).toBe(true);
        });

        it("should not render SearchResultsWidget", () => {
            expect(wrapper.find(SearchResultsWidget).exists()).toBe(false);
        });
    });
    describe("interaction", () => {
        it("should render search results after search submission", () => {
            const initialState = {
                offerSearch: {
                    searchValue: "searchValue",
                    offers: [],
                },
            };
            const mockStore = configureMockStore([thunk]);
            const store = mockStore(initialState);
            const wrapper = mount(
                <Provider store={store}>
                    <HomePage/>
                </Provider>);

            // Currently jsdom does not know about scrollIntoView function, and thus, the code will break when submitting search
            // As a workaround, a stub is defined below, just for the code to not throw the error and actually test what matters
            window.HTMLElement.prototype.scrollIntoView = function() {};

            wrapper.find("form#search_form").first().simulate("submit", {
                preventDefault: () => {},
            });
            expect(wrapper.find(SearchResultsWidget).exists()).toBe(true);
        });
    });
});
