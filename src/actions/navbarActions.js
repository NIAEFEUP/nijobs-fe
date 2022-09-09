export const NavbarActionTypes = Object.freeze({
    TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
    SET_AUTH_PAGE: "SET_AUTH_PAGE",
    SET_RECOVERY_TOKEN: "SET_RECOVERY_TOKEN",
});

export const toggleAuthModal = (page) => ({
    type: NavbarActionTypes.TOGGLE_LOGIN_MODAL,
    page: page,
});

export const setAuthPage = (page) => ({
    type: NavbarActionTypes.SET_AUTH_PAGE,
    page: page,
});

export const setRecoveryToken = (token) => ({
    type: NavbarActionTypes.SET_RECOVERY_TOKEN,
    token: token,
});
