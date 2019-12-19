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
      artist: setlist.artist.name,
      date: setlist.eventDate,
      venue: setlist.venue.name,
      city: `${setlist.venue.city.name}, ${setlist.venue.city.country.name}`,
      tour: setlist.tour.name,
      songs: setlist.sets.set[0].song
    }));
    // const songs = unformatted_data.map(setlist => ({
    //   songs: setlist.sets.set[0].song || false,
    //   encore: setlist.sets.set[1] || false
    // }));
    // console.log(unformatted_data);
    console.log(formatted_data);
    // console.log(songs);
    // console.log(unformatted_data[0].sets.set[0]);
    res.send(formatted_data);
  });
};
