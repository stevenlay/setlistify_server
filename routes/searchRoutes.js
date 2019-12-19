const axios = require("axios");
const keys = require("../config/keys");

module.exports = app => {
  app.get("/api/artist/:artist", async (req, res) => {
    const artist = req.params.artist;

    const options = {
      headers: {
        Accept: "application/json",
        "x-api-key": keys.setlistKey
      }
    };

    const setlist_res = await axios.get(
      `https://api.setlist.fm/rest/1.0/search/setlists?artistName='${artist}'&p=1`,
      options
    );

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
        setlist.sets && setlist.sets.set[0] ? setlist.sets.set[0].song : false
    }));

    res.send(formatted_data);
  });
};
