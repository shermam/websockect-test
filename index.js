#! /usr/bin/env node

const WSServer = require('websocket').server
const http = require('http');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
let wsConnection;

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const fileName = req.url.replace('/', '') || "index.html";

    readFile(__dirname + "\\web\\" + fileName).then(file => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/' + fileName.split('.')[1]);
        res.end(file);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/teste.json`);
});

const wsServer = new WSServer({
    httpServer: server
});

wsServer.on('request', request => {
    wsConnection = request.accept("teste", request.origin);
    readdir('./').then(files => {
        wsConnection.sendUTF(JSON.stringify(files));
    });
});