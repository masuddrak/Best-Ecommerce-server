const createError = require("http-errors");
const { users } = require("../models/userModel");
const getUsers = async (req, res, next) => {
  try {
    console.log("Get hg All Users");
    res.status(200).send({ message: users});
  } catch (error) {
    next(createError(error.message));
  }
};
module.exports = { getUsers };
