const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const i18n = require('i18n');

const User = require("../model/userModel");

router.get("/", (req, res) => {
  const locale = req.query.lang || 'en';
  i18n.setLocale(req, locale);
  res.render('register', { locale }); 
});


// Обработка GET запроса для страницы регистрации
router.get("/register", (req, res) => {
  const locale = req.query.lang || 'en';
  i18n.setLocale(req, locale);
  res.render('register', { locale }); 
});



// Обработка POST запроса для обработки данных регистрации
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send("Username already taken");
    }


    
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    await newUser.save();

    console.log("User registered successfully:", newUser);
    res.redirect("/login"); 
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user. Please try again.");
  }
});

module.exports = router;
