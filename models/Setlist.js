const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const setlistSchema = new Schema({
    title: String,
    subject: String,
    body: String,
    songs: [String],
    rating: {type: Number, default: 0},
    recipients: [RecipientSchema],
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: Date,
    lastResponded: Date
});

mongoose.model('setlist', setlistSchema);