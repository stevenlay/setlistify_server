import { FETCH_ARTIST_DETAILS } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case FETCH_ARTIST_DETAILS:
      return action.payload || false;

    default:
      return state;
  }
};
