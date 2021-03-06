const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: String,
    required: true,
    default: "Uncategorized"
  },
  date: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
