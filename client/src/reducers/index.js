import { combineReducers } from "redux";
import authReducer from "./authReducer";
import searchReducer from "./searchReducer";
import searchDetailsReducer from "./searchDetailsReducer";
import cookieReducer from "./cookieReducer";

export default combineReducers({
  auth: authReducer,
  expired: cookieReducer,
  search: searchReducer,
  searchDetails: searchDetailsReducer
});
