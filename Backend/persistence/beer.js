const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const beerSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 150,
  },
  image_url: {
    type: String,
  },
  abv: {
    type: Number,
  },
  alcochol_free: Boolean,
  type: {
    type: String,
  },
});

const Beer = model("Beer", beerSchema);

module.exports = { Beer: Beer };
