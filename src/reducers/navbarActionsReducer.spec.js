import navbarState from "./navbarActionsReducer";
import { toggleAuthModal } from "../actions/navbarActions";

describe("Notifications Reducer", () => {
    it("should correctly initialize notifications state", () => {
        const state = navbarState(undefined, {});
        expect(state).toEqual({ showLoginModal: false });
    });

    it("should toggle login modal when toggleAuthModal action is called", () => {
        let state = navbarState(
            {
                showLoginModal: false,
            },
            toggleAuthModal()
        );
        expect(state.showLoginModal).toBe(true);

        state = navbarState(state, toggleAuthModal());
        expect(state.showLoginModal).toBe(false);
    });
});
