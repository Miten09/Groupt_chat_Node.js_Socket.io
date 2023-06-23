const app = require("express")();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  const fileName = "index.html";
  res.sendFile(fileName, options);
});

// FOR BRODCASTING IN SOCKET.IO

// let users = 0;

// io.on("connection", function (socket) {
//   console.log("A user Connected");
//   users++;
//   socket.emit("newUserConnect", { message: "Hii Welcome Dear!" });

//   socket.broadcast.emit("newUserConnect", {
//     message: users + " user Connected",
//   });

//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//     users--;
//     socket.broadcast.emit("newUserConnect", {
//       message: users + " user Connected",
//     });
//   });
// });

// FOR NAMESPACES IN SOCKET.IO

// By Default NAMESPACE is ("/") WE can also MAKE CUSTOM NAMESPACES USING BELOW METHOD

// const cnsp = io.of("/custom-namespace");
// const cnsp1 = io.of("/custom-namespace-1");

// cnsp.on("connection", function (socket) {
//   console.log("A user Connected");

//   cnsp.emit("testEvent", "Tester event call");

//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//   });
// });

// MAKE ROOMS IN SOCKET.IO

// var roomno = 1;
// var full = 0;

// io.on("connection", function (socket) {
//   console.log("A user Connected");

//   socket.join("room " + roomno);
//   io.sockets
//     .in("room " + roomno)
//     .emit("connectedRoom", "Your are connected to room no " + roomno);

//   full++;
//   if (full >= 2) {
//     full = 0;
//     roomno++;
//   }
//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//   });
// });

//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------

// GROUP CHAT PROJECT STARTS FROM HERE

user = [];

io.on("connection", function (socket) {
  console.log("A user Connected successfully");
  socket.on("setUserName", (data) => {
    // console.log(data + " user connected");
    if (user.indexOf(data) > -1) {
      socket.emit(
        "userExists",
        data + " username is already in use please use another name"
      );
    } else {
      user.push(data);
      socket.emit("setUser", { userName: data });
    }
  });

  socket.on("msg", (data) => {
    io.sockets.emit("newmsg", data);
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

http.listen(3000, function () {
  console.log("listening on port 3000");
});
