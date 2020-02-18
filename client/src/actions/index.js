import axios from "axios";
import {
  FETCH_USER,
  FETCH_ARTIST,
  FETCH_ARTIST_DETAILS,
  IMPORT_SETLIST,
  CHECK_COOKIE
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchArtist = artist => async dispatch => {
  if (!artist) {
    return dispatch({ type: FETCH_ARTIST, payload: null });
  }
  const res = await axios.get(`/api/artist/${artist}`);
  dispatch({ type: FETCH_ARTIST, payload: res.data });
};

export const fetchArtistDetails = artist => async dispatch => {
  if (!artist) {
    return dispatch({ type: FETCH_ARTIST_DETAILS, payload: null });
  }
  try {
    const res = await axios.get(`/api/artist_details/${artist}`);
    dispatch({ type: FETCH_ARTIST_DETAILS, payload: res.data });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch({ type: CHECK_COOKIE, payload: true });
    }
  }
};

export const importSetlist = search => async dispatch => {
  console.log(search);

  const res = await axios.post(`/api/import`, { search });
  dispatch({ type: IMPORT_SETLIST, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleCredit = () => async dispatch => {
  const res = await axios.post("/api/credit_payment");
  dispatch({ type: FETCH_USER, payload: res.data });
};
