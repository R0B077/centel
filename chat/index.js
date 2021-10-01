const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

let db = new sqlite3.Database('./db/app.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    };
    console.log('Connected to the database.');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on("connection", (socket) => {
    console.log('user connected');
    socket.on("disconnect", () => {
        console.log('user disconnected');
    });
    socket.on("chat message", (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});

db.close((err) => {
    if (err) {
      return console.error(err.message);
    };
    console.log('Closed the database connection.');
});