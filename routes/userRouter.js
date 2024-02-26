const express = require("express");
const router = express.Router();
const i18n = require("i18n");
const Item = require("../model/itemModel"); 

// Обработка запросов для корневого маршрута '/'
router.get("/", async (req, res) => {
  const locale = req.query.lang || "en";
  i18n.setLocale(req, locale);
  const user = req.session.user;
  console.log("Received language:", locale);

  try {
   
    const items = await Item.find({ "timestamps.deleted": { $exists: false } });

    res.render("main", { user, locale, items }); 
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Error fetching items. Please try again.");
  }
});

router.post("/logout", (req, res) => {
  console.log("Received logout request");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Error during logout");
    } else {
      //
      res.redirect("/login");
    }
  });
});

module.exports = router;
