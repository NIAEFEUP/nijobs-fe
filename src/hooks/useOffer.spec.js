import React from "react";
import { render } from "../test-utils";
import useOffer from "./useOffer";

import useSWR, { mutate } from "swr";

jest.mock("swr", () => ({
    __esModule: true,
    default: jest.fn(),
    mutate: jest.fn(),
}));

describe("useOffer hook", () => {

    beforeEach(() => {
        useSWR.mockClear();
    });

    const HookWrapper = ({ notifyHookResult }) => {
        const result = useOffer();
        notifyHookResult(result);
        return null;
    };

    it("should return offer data", () => {

        const offerData = {
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
        };

        useSWR.mockImplementation(() => ({
            data: offerData,
            error: null,
            mutate: mutate,
        }));
        const notifyHookResult = jest.fn();
        render(
            <HookWrapper notifyHookResult={notifyHookResult} />
        );

        expect(notifyHookResult).toHaveBeenCalledWith(expect.objectContaining({
            offerData: offerData,
            error: null,
            mutate: mutate,
        }));
    });
});
