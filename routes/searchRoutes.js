const axios = require("axios");
const keys = require("../config/keys");
const util = require("../utils/helper");

module.exports = app => {
  app.get("/api/artist/:artist", async (req, res) => {
    const artist = req.params.artist;

    const options = {
      headers: {
        Accept: "application/json",
        "x-api-key": keys.setlistKey
      }
    };

    let err = false;
    const setlist_res = await axios
      .get(
        `https://api.setlist.fm/rest/1.0/search/setlists?artistName='${artist}'&p=1`,
        options
      )
      .catch(function(error) {
        if (error.response) {
          err = error.response.status;
        } else if (error.request) {
          err = error.request;
        } else {
          err = error.message;
        }
      });

    if (err) return res.send({ error: err });

    const unformatted_data = setlist_res.data.setlist;
    const formatted_data = unformatted_data.map(setlist => ({
      artist: setlist.artist ? setlist.artist.name : false,
      date: setlist.eventDate ? setlist.eventDate : false,
      venue: setlist.venue ? setlist.venue.name : false,
      city: setlist.venue.city
        ? `${setlist.venue.city.name}, ${setlist.venue.city.country.name}`
        : false,
      tour: setlist.tour ? setlist.tour.name : false,
      songs:
        setlist.sets && setlist.sets.set[0]
          ? util.filterSongs(setlist.sets.set[0].song)
          : false,
      encore:
        setlist.sets && setlist.sets.set[1] ? setlist.sets.set[1].song : false
    }));
    res.send({ artist, setlist: formatted_data });
  });
};
