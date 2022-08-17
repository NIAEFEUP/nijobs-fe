export const NavbarActionTypes = Object.freeze({
    TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
});

export const toggleAuthModal = () => ({
    type: NavbarActionTypes.TOGGLE_LOGIN_MODAL,
});
