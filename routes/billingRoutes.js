const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    req.user.credits += 10;
    const user = await req.user.save();
    res.send(user);
  });
};
