import { CHECK_COOKIE } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case CHECK_COOKIE:
      return action.payload || false;

    default:
      return state;
  }
};
