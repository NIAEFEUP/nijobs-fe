import navbarState from "./navbarActionsReducer";
import { toggleLoginModal } from "../actions/navbarActions";

describe("Notifications Reducer", () => {
    it("should correctly initialize notifications state", () => {
        const state = navbarState(undefined, {});
        expect(state).toEqual({ showLoginModal: false });
    });

    it("should toggle login modal when toggleLoginModal action is called", () => {
        let state = navbarState(
            {
                showLoginModal: false,
            },
            toggleLoginModal()
        );
        expect(state.showLoginModal).toBe(true);

        state = navbarState(state, toggleLoginModal());
        expect(state.showLoginModal).toBe(false);
    });
});
