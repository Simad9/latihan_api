const express = require("express");
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const postRoutes = express.Router();

postRoutes.get("/posts", getPost);
postRoutes.post("/posts", createPost);
postRoutes.put("/posts/:id", updatePost);
postRoutes.delete("/posts/:id", deletePost);

module.exports = postRoutes;
