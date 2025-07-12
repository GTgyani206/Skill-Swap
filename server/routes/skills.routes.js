const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const UserSkill = require("../model/userSkill.model");
const Skill = require("../model/skills.model");

router.post("/", authMiddleware, async (req, res) => {
  const { name, type, level } = req.body;

  try {
    let skill = await Skill.findOne({
      name: new RegExp("^" + name + "$", "i"),
    });
    if (!skill) {
      skill = new Skill({ name });
      await skill.save();
    }

    const newUserSkill = new UserSkill({
      userId: req.user.id,
      skillId: skill._id,
      type,
      level,
    });

    await newUserSkill.save();
    res.status(201).json(newUserSkill);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ msg: "You have already added this skill." });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
