import navbarState from "./navbarActionsReducer";
import { toggleAuthModal } from "../actions/navbarActions";

describe("Notifications Reducer", () => {
    it("should correctly initialize notifications state", () => {
        const state = navbarState(undefined, {});
        expect(state).toEqual({ showAuthModal: false });
    });

    it("should toggle login modal when toggleAuthModal action is called", () => {
        let state = navbarState(
            {
                showAuthModal: false,
            },
            toggleAuthModal()
        );
        expect(state.showAuthModal).toBe(true);

        state = navbarState(state, toggleAuthModal());
        expect(state.showAuthModal).toBe(false);
    });
});
