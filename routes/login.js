const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const i18n = require("i18n");
const User = require("../model/userModel");

// Обработка GET запроса для страницы входа
router.get("/login", (req, res) => {
  const locale = req.query.lang || "en";
  i18n.setLocale(req, locale);

  res.render("login", { locale });
});

// Обработка POST запроса для обработки данных входа
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(401).send(i18n.__("InvalidCredentials"));
    }


    const passwordMatch = await bcrypt.compare(password, user.password); 

    if (passwordMatch) {
      req.session.user = {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      };

      if (user.isAdmin) {
        console.log("Admin login successful");
        res.redirect("/admin");
      } else {
        console.log("User login successful");
        res.redirect("/user");
      }
    } else {
      console.log("Invalid password");
      res.status(401).send(i18n.__("InvalidCredentials"));
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send(i18n.__("LoginError"));
  }
});

module.exports = router;
