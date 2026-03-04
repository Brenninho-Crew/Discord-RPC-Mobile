const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let users = {};

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    socket.on('updateRPC', (data) => {
        users[socket.id] = data;
        io.emit('allUsers', users);
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('allUsers', users);
        console.log("User disconnected:", socket.id);
    });
});

http.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
