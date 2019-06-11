const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Setlist = mongoose.model('setlist');

module.exports = app => {
    app.post('/api/setlists', requireLogin, requireCredits, (req, res) => {
        const { title, description, artist, songs, recipients} = req.body;
        
        const setlist = new Setlist({
            title,
            description,
            artist,
            songs,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            _user: req.user.id,
            dateCreated: Date.now()
        })
    });
};