const mongoose = require("mongoose");

const userSkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    type: { type: String, enum: ["OFFERED", "WANTED"], required: true },
    level: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true },
);

userSkillSchema.index({ userId: 1, skillId: 1 }, { unique: true });
const UserSkill = mongoose.model("UserSkill", userSkillSchema);
module.exports = UserSkill;
