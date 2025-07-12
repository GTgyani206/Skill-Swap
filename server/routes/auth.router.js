const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../model/user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //user check
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    //new user creation
    user = new User({
      name,
      email,
      password,
    });

    //password hashing
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //save user
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
