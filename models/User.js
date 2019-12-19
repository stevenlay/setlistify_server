const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  spotifyId: String,
  accessToken: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
