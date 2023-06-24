

import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: SocketIOServer;
    private server: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
        })
    }

    start(callback: () => void) {
        this.server.listen(this.port, callback);
    }
}
