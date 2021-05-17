const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  console.group("Event received");
  console.log(req.body);
  console.groupEnd();
  const { type, data } = req.body;
  if (type === "CommentCreated"){
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      }
    })
    res.send({});
  }
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
