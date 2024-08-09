const createError = require("http-errors");
const { posts } = require("../models/postModel");

const getPosts = async (req, res, next) => {
  try {
    console.log("Get hg All Users");
    res.status(200).send({ message: posts});
  } catch (error) {
    next(createError(error.message));
  }
};
module.exports = { getPosts };