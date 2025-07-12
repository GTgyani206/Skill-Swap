const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    swap_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Swap",
      required: true,
      index: true,
    },
    reviewer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true },
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
