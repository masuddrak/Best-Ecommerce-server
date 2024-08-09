const express = require("express");
const { getPosts } = require("../controllers/postController");
const postRouter = express.Router();


postRouter.get("/", getPosts);

module.exports = { postRouter };
