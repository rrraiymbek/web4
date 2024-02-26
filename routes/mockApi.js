const express = require("express");
const router = express.Router();
const axios = require("axios");
const History = require("../model/historySchema");
const i18n = require("i18n");


router.get("/mockapi", async (req, res) => {
  const locale = req.query.lang || "en";
  i18n.setLocale(req, locale);
  let data;
  let error = null;

  try {
    // Fetch the latest data
    const options = {
      method: "GET",
      url: "https://6559fa956981238d054d0040.mockapi.io/users",
    };

    const response = await axios.request(options);
    data = response.data;
    console.log(data);

    const historyEntry = new History({
      user_id: req.session.user.id, // Assuming user information is stored in the session
      request_type: "Mock API Data",
      request_data: JSON.stringify(data), // Convert data to a string for storage
      outcome: "Success",
    });
    await historyEntry.save();
  } catch (err) {
    console.error(err);
    data = null;
    error = "Error fetching data, please try again";

    const historyEntry = new History({
      user_id: req.session.user.id, // Assuming user information is stored in the session
      request_type: "Mock API Data",
      request_data: null, // No data to store
      outcome: "Error",
    });
    await historyEntry.save();
  }

  // Render the view with the fetched data
  res.render("mockApi", { data, error });
});

module.exports = router;
