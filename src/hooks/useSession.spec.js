import React from "react";
import { render } from "../test-utils";
import useSession from "./useSession";

jest.mock("swr", () => ({
    __esModule: true,
    default: jest.fn(),
    mutate: jest.fn(),
}));

import useSWR from "swr";

describe("useSession hook", () => {

    beforeEach(() => {
        useSWR.mockClear();
    });

    const HookWrapper = ({ notifyHookResult }) => {
        const result = useSession();
        notifyHookResult(result);
        return null;
    };

    it("should return logged in session information", () => {

        useSWR.mockImplementation(() => ({
            data: "test",
            error: null,
            isValidating: true,
        }));
        const notifyHookResult = jest.fn();
        render(
            <HookWrapper notifyHookResult={notifyHookResult}/>
        );

        expect(notifyHookResult).toHaveBeenCalledWith(expect.objectContaining({
            isLoggedIn: true,
            data: "test",
            error: null,
            isValidating: true,
        }));
    });

    it("should return logged out session information", () => {

        useSWR.mockImplementation(() => ({
            data: null,
            error: null,
            isValidating: true,
        }));
        const notifyHookResult = jest.fn();
        render(
            <HookWrapper notifyHookResult={notifyHookResult}/>
        );

        expect(notifyHookResult).toHaveBeenCalledWith(expect.objectContaining({
            isLoggedIn: false,
            data: null,
            error: null,
            isValidating: true,
        }));
    });

});
