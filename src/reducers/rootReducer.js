import { combineReducers } from "redux";
import LoadingStatusReducer from "./loadingStatusReducer";

const rootReducer = combineReducers({
  loadingStatus: LoadingStatusReducer,
});

export default rootReducer;
