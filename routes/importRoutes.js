const axios = require("axios");
const keys = require("../config/keys");
const util = require("../utils/helper");

module.exports = app => {
  app.post("/api/import", async (req, res) => {
    const options = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${req.user.accessToken}`
      }
    };

    const artist = req.body.search.artistName;
    const body = {
      name: `Setlist for ${artist}`,
      description: "Most likely songs for upcoming concerts",
      public: false
    };

    let err = false;
    const artistRes = await axios
      .post(`https://api.spotify.com/v1/playlists`, body, options)
      .catch(function(error) {
        if (error.response) {
          err = error.response.status;
        } else if (error.request) {
          err = error.request;
        } else {
          err = error.message;
        }
      });

    console.log(err);
    if (err) return res.send({ error: err });

    console.log(artistRes);

    //     const artistDetails = util.formatArtistDetails(
    //       artistRes.data.artists.items[0]
    //     );
    res.send({ response: artistRes });
  });
};
