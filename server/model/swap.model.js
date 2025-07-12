const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema(
  {
    requester_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    responder_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    responder_skill_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    requester_skill_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

swapSchema.pre("save", function (next) {
  if (this.requester_id.equals(this.responder_id)) {
    const err = new Error("The User cannot be Requester and Responder both!");
    next(err);
  } else {
    next();
  }
});

const Swap = mongoose.model("Swap", swapSchema);
module.exports = Swap;
