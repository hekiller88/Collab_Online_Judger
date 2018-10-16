const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
var socketIO = require('socket.io');
var io = socketIO();
var editorSocketService = require('./services/editorSocketService')(io);
const restRouter = require('./routes/rest');
const mongoose = require('mongoose');

//app.get('/', (req, res) => res.send('mei JJ!'))


//api: getting data, v1 - version indicated

app.use('/api/v1', restRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res) => {
	res.sendFile('index.html', {root: path.join(__dirname, '../public/')});
});

mongoose.connect('mongodb://user:user123@ds255797.mlab.com:55797/problems', {useNewUrlParser: true}); //user: user123 - id/ps

//app.listen(3000, () => console.log(`Example app listening on port 3000!`));
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', onListening);

function onListening() {
	console.log('Example app listening on port 3000!');
}

