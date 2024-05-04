const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    description: {
      type: String,
      required: [true, "Please add the email address"],
    },
    team: {
      type: String,
      required: [true, "Please add the phone number"],
    },
    assignee: {
      type: String,
      required: [true, "Please add the phone number"],
    },
    priority: {
      type: String,
      required: [true, "Please add the phone number"],
    },
    status: {
      type: String,
      required: [true, "Please add the phone number"],
    },
    startDate: { 
      type: Date, 
      default: Date.now 
    },
    endDate: { 
      type: Date, 
      default: null 
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
