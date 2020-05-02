const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4001;

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const postId = req.params.id;

  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
