const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: "/auth/spotify/callback"
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      let existingUser = await User.findOneAndUpdate(
        { spotifyId: profile.id },
        { accessToken }
      );
      console.log(existingUser);

      if (!existingUser) {
        const user = await new User({
          spotifyId: profile.id,
          accessToken
        }).save();
        return done(null, user);
      }
      done(null, existingUser);
    }
  )
);
