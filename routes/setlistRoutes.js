const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const setlistTemplate = require('../services/emailTemplates/setlistTemplate');

const Setlist = mongoose.model('setlist');

module.exports = app => {
    app.post('/api/setlists', requireLogin, requireCredits, (req, res) => {
        const { title, subject, artist, songs, recipients} = req.body;
        
        const setlist = new Setlist({
            title,
            subject,
            artist,
            songs,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            _user: req.user.id,
            dateCreated: Date.now()
        });
        const mailer = new Mailer(setlist, setlistTemplate(setlist));
        try {
            mailer.send();
        } catch (err) {
            console.log("err");
            res.status(422).send(err);
        }

    }); 
};