const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");

require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    req.user.credits += 10;
    const user = await req.user.save();
    res.send(user);
  });
  app.post("/api/credit_payment", requireLogin, async (req, res) => {
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  });
};
