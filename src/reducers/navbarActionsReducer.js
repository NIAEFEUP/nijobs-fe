import { NavbarActionTypes } from "../actions/navbarActions";


const initialState = {
    showAuthModal: false,
    authModalPage: 0,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case NavbarActionTypes.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showAuthModal: !state.showAuthModal,
                // Change page only when opening. Fixes a flicker bug on closing the modal
                authModalPage: !state.showAuthModal ? (action.page || 0) : state.authModalPage,
            };
        case NavbarActionTypes.SET_AUTH_PAGE:
            return {
                ...state,
                authModalPage: action.page,
            };
        case NavbarActionTypes.SET_RECOVERY_TOKEN:
            return {
                ...state,
                recoveryToken: action.token,
            };
        default:
            return state;
    }
};
