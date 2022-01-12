const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users={};

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on("new-user-joined",name=>{
                 users[socket.id]=name;
                socket.broadcast.emit("user-joined",name);
             });
        
             socket.on("send",message=>{
                 socket.broadcast.emit("receive",{message:message,name:users[socket.id]});
             });

             socket.on("disconnect",message=>{
                socket.broadcast.emit("left",users[socket.id]);
                delete users[socket.id];
            });
});


let port=process.env.PORT;

if(port==null || port==""){
    port=3000;
}

server.listen(port, () => {
    console.log('listening on *:3000');
  });
  







// io.on("connection",socket=>{
//    
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });

  