import { combineReducers } from "redux";
import authReducer from "./authReducer";
import searchReducer from "./searchReducer";
import searchDetailsReducer from "./searchDetailsReducer";

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  searchDetails: searchDetailsReducer
});
