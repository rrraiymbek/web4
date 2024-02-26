const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  request_type: { type: String, required: true },
  request_data: { type: String },
  timestamp: { type: Date, default: Date.now },
  outcome: { type: String },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
