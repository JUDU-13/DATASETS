const Enquiry = require("../models/enquiry");

exports.getEnquiry = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find();
    if (!enquiries) {
      const error = new Error("NO_ENQUIRIES_FOUND");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({
      message: "ENQUIRIES_FETCHED",
      enquiries: enquiries,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addEnquiry = async (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const location = req.body.location;
  const note = req.body.note || "No Notes";
  const message = req.body.message || "No Message";

  try {
    const enquiry = new Enquiry({
      name: name,
      phone: phone,
      location: location,
      note: note,
      message: message
    });
    await enquiry.save();

    res.status(201).json({
      message: "ENQUIRY_ADDED",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateEnquiry = async (req, res, next) => {
  const enqId = req.params.enqId;
  const status = req.body.status;
  const note = req.body.note;

  try {
    const enquiry = await Enquiry.findOne({ _id: enqId });
    if (!enquiry) {
      const error = new Error("ENQUIRY_NOT_FOUND");
      error.statusCode = 401;
      throw error;
    }
    await enquiry.updateOne({ status: status, note: note });

    res.status(201).json({
      message: "ENQUIRY_UPDATED",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteEnquiry = async (req, res, next) => {
  const enqId = req.params.enqId;

  try {
    const enquiry = await Enquiry.findOne({ _id: enqId });
    if (!enquiry) {
      const error = new Error("ENQUIRY_NOT_FOUND");
      error.statusCode = 401;
      throw error;
    }
    await Enquiry.findByIdAndRemove(enqId);

    res.status(201).json({
      message: "ENQUIRY_DELETED",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
