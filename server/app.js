const express = require("express");
const http = require("http");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const path = require('path')
require('dotenv').config();
const errorHandlers = require("./handlers/errorHandler");
const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use('/api', apiRouter)
app.use('/', indexRouter)

app.use( (req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})


const app2 = express();
const server = http.createServer(app2);
const socket = require("socket.io");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const users = {};

io.on("connection", (socket) => {
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }

  socket.emit("yourID", socket.id);
  io.sockets.emit("allUsers", users);
  socket.on("disconnect", () => {
    delete users[socket.id];
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("hey", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(8000, () => console.log("webRTC server is running on port 8000"));

module.exports = app;
