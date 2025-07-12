// server/routes/users.routes.js
const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const UserSkill = require("../model/userSkill.model");
router.get("/", async (req, res) => {
  try {
    const users = await User.aggregate([
      { $match: { isPublic: true } },

      {
        $lookup: {
          from: "userskills",
          localField: "_id",
          foreignField: "userId",
          as: "skills",
        },
      },

      {
        $lookup: {
          from: "skills",
          localField: "skills.skillId",
          foreignField: "_id",
          as: "skillInfo",
        },
      },

      {
        $project: {
          password: 0,
          email: 0,
        },
      },
    ]);

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
