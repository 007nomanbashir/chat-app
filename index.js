const http = require('http');
const express = require('express');
const app = express();
const port = 8090;
const server = http.createServer(app);
const path = require('path');
const {Server} = require('socket.io');

const io = new Server(server);
// socket.io code
io.on('connection', (socket)=>{
    socket.on('user-message', (message)=>{
        console.log(`A new message received ${message}`);
        io.emit('message', message);
    })
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});
server.listen(port, () => console.log(`server started at port ${port}`));