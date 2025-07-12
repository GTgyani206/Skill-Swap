const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
  },
  { timestamps: true },
);

const Skill = mongoose.model("Skill", skillsSchema);
module.exports = Skill;
