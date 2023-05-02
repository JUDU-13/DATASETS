const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    phone: {
      type: Number,
      required: [true, "Please add contact number!"],
    },
    location: {
      type: String,
      required: [true, "Please add the station location!"],
    },
    status: {
      type: String,
      default: "pending",
    },
    note: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
