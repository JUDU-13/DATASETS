const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      const error = new Error("NO_USERS_FOUND");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({
      message: "USERS_FETCHED",
      users: users,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  try {
    const user = new User({
      name: name,
      email: email,
    });
    await user.save();

    res.status(201).json({
      message: "USER_ADDED",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
