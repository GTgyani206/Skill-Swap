const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: { type: String, required: true, minLength: 8 },
    location: { type: String },
    profilePhotoUrl: { type: String },
    availability: { enum: ["WEEKEND", "WEEKDAY", "FULLTIME"] },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
