const axios = require("axios");
const keys = require("../config/keys");
const util = require("../utils/helper");
const requireLogin = require("../middlewares/requireLogin");

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
    const setlistRes = await axios
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

    const formattedData = util.formatSetlistData(setlistRes.data.setlist);
    const nonEmptySetlists = util.filterSetlistData(formattedData);
    const uniqueArtists = util.uniqueArtists(formattedData);

    res.send({
      artist,
      numArtists: uniqueArtists.size,
      setlists: formattedData,
      nonEmptySetlists
    });
  });

  app.get("/api/artist_details/:artist", requireLogin, async (req, res) => {
    const artist = req.params.artist;
    const options = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${req.user.accessToken}`
      },
      params: {
        q: artist,
        type: "artist"
      }
    };

    let err = false;
    const artistRes = await axios
      .get(`https://api.spotify.com/v1/search`, options)
      .catch(function(error) {
        if (error.response) {
          err = error.response.status;
        } else if (error.request) {
          err = error.request;
        } else {
          err = error.message;
        }
      });

    const artistDetails = util.formatArtistDetails(
      artistRes.data.artists.items[0]
    );
    res.send({ artist: artistDetails });
  });
};
