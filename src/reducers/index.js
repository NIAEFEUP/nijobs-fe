/* istanbul ignore file */
import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";
import searchOffersReducer from "./searchOffersReducer";
import companyApplicationReducer from "./companyApplicationReducer";
import navbarActionsReducer from "./navbarActionsReducer";
import passwordRecoveryReducer from "./passwordRecoveryReducer";

// Multiple reducers can exist for different parts of the app
export default combineReducers({
    messages: notificationReducer,
    offerSearch: searchOffersReducer,
    companyApplication: companyApplicationReducer,
    passwordRecovery: passwordRecoveryReducer,
    navbar: navbarActionsReducer,
});
