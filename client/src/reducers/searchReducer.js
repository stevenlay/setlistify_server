import { FETCH_ARTIST } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ARTIST:
      return action.payload || false;

    default:
      return state;
  }
};
