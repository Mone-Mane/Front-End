// // server.js
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// let categoryClickedIndex = null;
// let costClickedIndex = null;
// let dateClickedIndex = null;

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.emit("categoryClickedIndex", categoryClickedIndex);
//   socket.emit("costClickedIndex", costClickedIndex);
//   socket.emit("dateClickedIndex", dateClickedIndex);

//   socket.on("categoryClickedIndex", (index) => {
//     categoryClickedIndex = index;
//     io.emit("categoryClickedIndex", index);
//   });

//   socket.on("costClickedIndex", (index) => {
//     costClickedIndex = index;
//     io.emit("costClickedIndex", index);
//   });

//   socket.on("dateClickedIndex", (index) => {
//     dateClickedIndex = index;
//     io.emit("dateClickedIndex", index);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// server.listen(3000, () => console.log("Listening on port 3000"));
