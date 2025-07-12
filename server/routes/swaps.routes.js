const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const Swap = require("../model/swap.model");
const UserSkill = require("../model/userSkill.model");

router.post("/", authMiddleware, async (req, res) => {
  const { responder_id, requester_skill_id, responder_skill_id, message } =
    req.body;
  const requester_id = req.user.id;

  try {
    const requesterSkill = await UserSkill.findById(requester_skill_id);
    if (!requesterSkill || !requesterSkill.userId.equals(requester_id)) {
      return res.status(400).json({ msg: "Invalid requester skill." });
    }

    const responderSkill = await UserSkill.findById(responder_skill_id);
    if (!responderSkill || !responderSkill.userId.equals(responder_id)) {
      return res.status(400).json({ msg: "Invalid responder skill." });
    }

    const newSwap = new Swap({
      requester_id,
      responder_id,
      requester_skill_id,
      responder_skill_id,
      message,
    });

    await newSwap.save();
    res.status(201).json(newSwap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
