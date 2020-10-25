import { act, fireEvent, screen } from "@testing-library/react";
import React, { useCallback, useContext } from "react";
import { applyMiddleware, compose, createStore } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import { renderWithStore } from "../test-utils";
import UndoableActionsHandlerProvider, { UndoableActions } from "./UndoableActionsHandlerProvider";
import { SnackbarProvider } from "notistack";
import Notifier from "../components/Notifications/Notifier";

jest.useFakeTimers();

describe("UndoableActionsHandlerProvider", () => {

    let onDone, onCancelled, wrapper;

    beforeEach(() => {
        onDone = jest.fn();
        onCancelled = jest.fn();

        const randomId = Math.random().toString(36).substring(7);
        const ActionCallerTest = () => {

            const { submitAction } = useContext(UndoableActions);

            const generateAction = useCallback(
                () => {
                    submitAction(
                        randomId,
                        "This action was executed",
                        onDone,
                        onCancelled,
                        5000
                    );
                },
                [submitAction]
            );
            return (
                <button data-testid="action-generator-btn" onClick={generateAction}/>
            );
        };

        const store = createStore(reducer, { messages: { notifications: [] } }, compose(applyMiddleware(thunk)));
        wrapper = renderWithStore(
            <SnackbarProvider>
                <Notifier />
                <UndoableActionsHandlerProvider>
                    <ActionCallerTest />
                </UndoableActionsHandlerProvider>
            </SnackbarProvider>,
            { store }
        );
    });

    it("should render a notification when submitting an undoable action", async () => {

        expect(screen.queryByText("This action was executed")).not.toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(wrapper.getByTestId("action-generator-btn"));
        });

        expect(screen.getByText("This action was executed")).toBeInTheDocument();

        await act(async () => {
            await jest.advanceTimersByTime(5000);
        });

        expect(onDone).toHaveBeenCalledTimes(1);
        expect(onCancelled).toHaveBeenCalledTimes(0);

        await act(async () => {
            await jest.advanceTimersByTime(500); // wait for notification to disappear
        });

        expect(screen.queryByText("This action was executed")).not.toBeInTheDocument();


    });

    it("should cancel an action when clicking Undo button", async () => {

        expect(screen.queryByText("This action was executed")).not.toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(wrapper.getByTestId("action-generator-btn"));
        });

        expect(screen.getByText("This action was executed")).toBeInTheDocument();

        await act(async () => {
            await jest.advanceTimersByTime(2000);
        });

        await act(async () => {
            await fireEvent.click(screen.getByText("Undo"));
        });

        expect(onDone).toHaveBeenCalledTimes(0);
        expect(onCancelled).toHaveBeenCalledTimes(1);

        await act(async () => {
            await jest.advanceTimersByTime(500); // wait for notification to disappear
        });

        expect(screen.queryByText("This action was executed")).not.toBeInTheDocument();

    });

    it("should execute an action when clicking close button", async () => {

        expect(screen.queryByText("This action was executed")).not.toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(wrapper.getByTestId("action-generator-btn"));
        });

        expect(screen.getByText("This action was executed")).toBeInTheDocument();

        await act(async () => {
            await jest.advanceTimersByTime(2000);
        });

        await act(async () => {
            await fireEvent.click(screen.getByLabelText("Close"));
        });

        expect(onDone).toHaveBeenCalledTimes(1);
        expect(onCancelled).toHaveBeenCalledTimes(0);

        await act(async () => {
            await jest.advanceTimersByTime(500); // wait for notification to disappear
        });

        expect(screen.queryByText("This action was executed")).not.toBeInTheDocument();

    });
});
