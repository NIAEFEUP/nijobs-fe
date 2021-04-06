import React from "react";
import { render } from "../test-utils";
import useComponentController, { DefaultContext } from "./useComponentController";

describe("useComponentController hook", () => {

    const HookWrapper = ({ notifyHookResult, controller, controllerParams, context }) => {
        const result = useComponentController(controller, controllerParams, context);
        notifyHookResult(result);
        return null;
    };

    it("should return a Context Provider(and params) with info from the controller", () => {

        const controller = (param) => ({
            controllerOptions: {
                initialValue: {
                    foo: param,
                },
            },
            foo: `${param}2`,
        });

        const controllerParams = "bar";

        const context = React.createContext();

        const notifyHookResult = jest.fn();
        render(
            <HookWrapper
                notifyHookResult={notifyHookResult}
                controller={controller}
                controllerParams={controllerParams}
                context={context}
            />
        );

        expect(notifyHookResult.mock.calls[0][0].ContextProvider).toStrictEqual(context.Provider);
        expect(notifyHookResult.mock.calls[0][0].contextProviderProps).toMatchObject({ value: { foo: controllerParams } });
        expect(notifyHookResult.mock.calls[0][0].foo).toBe(`${controllerParams}2`);
        expect(Object.keys(notifyHookResult.mock.calls[0][0])).toEqual(["foo", "ContextProvider", "contextProviderProps"]);
    });

    it("should handle default values (No context)", () => {

        const notifyHookResult = jest.fn();
        render(
            <HookWrapper
                notifyHookResult={notifyHookResult}
            />
        );

        expect(notifyHookResult.mock.calls[0][0].ContextProvider).toStrictEqual(DefaultContext.Provider);
        expect(notifyHookResult.mock.calls[0][0].contextProviderProps).toMatchObject({ value: {} });
        expect(Object.keys(notifyHookResult.mock.calls[0][0])).toEqual(["ContextProvider", "contextProviderProps"]);
    });

    it("should handle default values (No initial value)", () => {

        const controller = (param) => ({
            foo: `${param}2`,
        });

        const controllerParams = "bar";

        const context = React.createContext();

        const notifyHookResult = jest.fn();
        render(
            <HookWrapper
                notifyHookResult={notifyHookResult}
                controller={controller}
                controllerParams={controllerParams}
                context={context}
            />
        );

        expect(notifyHookResult.mock.calls[0][0].ContextProvider).toStrictEqual(DefaultContext.Provider);
        expect(notifyHookResult.mock.calls[0][0].contextProviderProps).toMatchObject({ value: {} });
        expect(Object.keys(notifyHookResult.mock.calls[0][0])).toEqual(["foo", "ContextProvider", "contextProviderProps"]);
    });
});
