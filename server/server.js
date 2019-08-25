const path = require("path");
const http = require("http");

const express = require("express");

const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on("connection", socket => {
  console.log("new user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.emit("newMessage", generateMessage("Admin", "WellCome to ChatApp"));

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New User Connected")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      cerateAt: new Date().getTime()
    });

    callback("this is from server");
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   cerateAt: new Date().getTime()
    // });
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
