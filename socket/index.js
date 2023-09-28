import { Server } from "socket.io";
import { createServer } from "http";

let onlineUsers = [];
const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });
  socket.on("sendNotification", ({ senderName, reciverName, type }) => {
    const reciver = getUser(reciverName);
    socket.to(reciver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });
  
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

httpServer.listen(5000);
