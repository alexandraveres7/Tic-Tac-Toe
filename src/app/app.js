const Express = require("express")();
const Http = require("http").Server(Express);
/*const Socketio = require("socket.io")(Http);

Http.listen(3000, () => {
  console.log("Listening at :3000...");
});

Socketio.on("connection", socket => {
  socket.emit("player", player);
  socket.on("move", data => {
    switch(data) {
      case "left":
        position.x -= 5;
        Socketio.emit("position", position);
        break;
    }
  });
});*/

