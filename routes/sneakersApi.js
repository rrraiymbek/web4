const express = require("express");
const router = express.Router();
const SneaksAPI = require("sneaks-api");
const History = require("../model/historySchema");
const i18n = require("i18n");
router.get("/sneakersApi", async (req, res) => {
  const sneakers = req.query.sneakers;
  const locale = req.query.lang || "en";
  i18n.setLocale(req, locale);
  try {
    const sneaks = new SneaksAPI();
    sneaks.getProducts(sneakers, 10, function (err, products) {
      if (err) {
        console.error(err);
        res.render("sneakersApi", {
          sneakers,
          error: "Error fetching sneaker data",
        });
      } else {
        console.log(products);
        const historyEntry = new History({
          user_id: req.session.user.id,
          request_type: "sneakers",
          request_data: `${sneakers}`,
          outcome: "Success",
        });
        historyEntry.save();
        res.render("sneakersApi", { sneakers, products, error: null });
      }
    });
  } catch (err) {
    console.error(err);
    const historyEntry = new History({
      user_id: req.session.user.id,
      request_type: "sneakers",
      request_data: `${sneakers}`,
      outcome: "Error",
    });
    historyEntry.save();
    res.render("sneakersApi", {
      sneakers,
      error: "Error fetching sneaker data",
    });
  }
});

module.exports = router;
