const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  stationName: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  details: [
    {
      areaName: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      area: {
        type: Number,
      },
      desc: {
        type: String,
      },
      images: [],
      floor: {
        type: String,
      }
    },
  ],
  outline: {
    type: String
  }
});

module.exports = mongoose.model("Station", stationSchema);
