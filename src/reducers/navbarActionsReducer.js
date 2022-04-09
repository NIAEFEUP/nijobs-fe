import { NavbarActionTypes } from "../actions/navbarActions";


const initialState = {
    showLoginModal: false,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case NavbarActionTypes.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: !state.showLoginModal,
            };
        default:
            return state;
    }
};
