const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    names: {
      en: String,
      es: String,
    },
    descriptions: {
      en: String,
      es: String,
    },
    timestamps: {
      created: { type: Date, default: Date.now },
      updated: { type: Date, default: Date.now },
      deleted: { type: Date },
    },
    pictures: [String],
  });
  
  const Item = mongoose.model('Item', itemSchema);

  module.exports = Item;