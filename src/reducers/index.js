import { combineReducers } from "redux";
import sleepyReducer from "./sleepyReducer";
import dogReducer from "./dogReducer";
import notificationReducer from "./notificationReducer";
import offerReducer from "./offerReducer";

// Multiple reducers can exist for different parts of the app
export default combineReducers({
    sleepy: sleepyReducer,
    dog: dogReducer,
    messages: notificationReducer,
    offerSearch: offerReducer,
});
