const axios = require("axios");
const keys = require("../config/keys");
const util = require("../utils/helper");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  getAlbumIds = async (artistId, options) => {
    let err = false;
    const albumRes = await axios
      .get(`https://api.spotify.com/v1/artists/${artistId}/albums`, options)
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

    const albumIds = albumRes.data.items.map(album => {
      return album.id;
    });
    return albumIds;
  };

  getTracksFromAlbumIds = async (ids, options) => {
    if (!ids) {
      return res.send({ error: "No album ids found" });
    }
    let err = false;
    const albumAndTracksRes = await axios
      .get(`https://api.spotify.com/v1/albums`, { ...options, params: { ids } })
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

    formattedAlbumAndTracks = albumAndTracksRes.data.albums.map(album => {
      return {
        album_name: album.name,
        album_tracks: util.formatAlbumTracks(album.tracks)
      };
    });
    return formattedAlbumAndTracks;
  };

  app.post("/api/import", requireLogin, async (req, res) => {
    if (!req.user) {
      res.redirect("/");
    }
    const options = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${req.user.accessToken}`
      }
    };

    // Get albums from the artist
    const artistId = req.body.search.artistSpotifyId;
    const albumIds = await getAlbumIds(artistId, options);

    let albumIdsString = "";
    if (albumIds.length > 0) {
      albumIdsString = albumIds.join(",");
    } else {
      res.send({ err: "No artist found" });
    }

    const albumAndTracksRes = await getTracksFromAlbumIds(
      albumIdsString,
      options
    );
    console.log(
      albumAndTracksRes.map(album => {
        return album.album_tracks;
      })
    );

    //     const artist = req.body.search.artistName;
    //     const body = {
    //       name: `Setlist for ${artist}`,
    //       description: "Most likely songs for upcoming concerts",
    //       public: false
    //     };

    //     let err = false;
    //     const artistRes = await axios
    //       .post(`https://api.spotify.com/v1/playlists`, body, options)
    //       .catch(function(error) {
    //         if (error.response) {
    //           err = error.response.status;
    //         } else if (error.request) {
    //           err = error.request;
    //         } else {
    //           err = error.message;
    //         }
    //       });

    //     console.log(err);
    //     if (err) return res.send({ error: err });

    //     console.log(artistRes);

    //     //     const artistDetails = util.formatArtistDetails(
    //     //       artistRes.data.artists.items[0]
    //     //     );
    //     res.send({ response: artistRes });
  });
};
