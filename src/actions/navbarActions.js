export const NavbarActionTypes = Object.freeze({
    TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
    SET_AUTH_PAGE: "SET_AUTH_PAGE",
});

export const toggleAuthModal = (page) => ({
    type: NavbarActionTypes.TOGGLE_LOGIN_MODAL,
    page: page,
});

export const setAuthPage = (page) => ({
    type: NavbarActionTypes.SET_AUTH_PAGE,
    page: page,
});
