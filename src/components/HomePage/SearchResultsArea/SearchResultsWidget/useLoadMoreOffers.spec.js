import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { render } from "../../../../test-utils";
import useLoadMoreOffers from "./useLoadMoreOffers";

jest.mock("react-redux", () => {});

// TODO: complete this

describe("useLoadMoreOffers hook", () => {

    const HookWrapper = ({ notifyHookResult }) => {
        const result = useLoadMoreOffers({ shouldFetchMoreOffers: false });
        notifyHookResult(result);
        return null;
    };

    it("should return offer data", () => {

        useSelector.mockImplementation(() => {});
        useDispatch.mockImplementation(() => {});

        const notifyHookResult = jest.fn();
        render(
            <HookWrapper notifyHookResult={notifyHookResult} />
        );

        expect(notifyHookResult).toHaveBeenCalledWith(expect.objectContaining({
            offers: [],
            hasMoreOffers: false,
            loading: false,
            error: null,
        }));
    });
});
