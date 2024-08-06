const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

//socket connection
io.on("connection", (socket) => {
  console.log("User is connected", socket.id);
  socket.on("chatm", (message) => {
    io.emit("chat", message);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
server.listen(3000,() => {
    console.log("Listening at port 3000...");
  });
  

