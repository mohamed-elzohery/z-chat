import {Server} from 'socket.io';
import jwt, {JwtPayload} from 'jsonwebtoken';
import BadRequest from './utils/errors/BadRequest';
import User, { UserI } from './models/User';
import server from './server';
import { IncomingMessage } from 'http';
import getChatMessages from './controllers/messages/getChatMessages';
import mongoose from 'mongoose';

interface AuthenticatedMessage extends IncomingMessage{
    user: UserI
}

const io = new Server(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: "*",
        credentials: true
      }
});

// Auth middleware
io.use(async (socket, next) => {
    const token = socket.request.headers.cookie.split('=')[1];
    if(!token){
        next(new BadRequest('invalid token'));
        return;
    }

    let decodedToken;

    try{
        decodedToken = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;
    }catch(err){
        next(new BadRequest('invalid token'));
        return;
    }

    const user = await User.findById(decodedToken.id);
    if(!user){
        next(new BadRequest('invalid token'));
        return;
    };
    (socket.request as AuthenticatedMessage).user= user;
    next();
  });


io.on("connection", async socket => {
    // Join to the user room
    const privateRoom = (socket.request as AuthenticatedMessage).user._id;
    const username = (socket.request as AuthenticatedMessage).user.name;
    await socket.join(privateRoom.toString());
    console.log(io.sockets.adapter.rooms);
    console.log(`${username} joined to room ${privateRoom}`);

    socket.on('load-messages', async (receiverId: string) => {
        const messages = await getChatMessages(receiverId, privateRoom);
        console.log(messages);
        socket.emit('load-messages', messages);
    });

    socket.on('leave-room', (roomId) => {
        console.log(`${username} left room ${roomId}`);
        socket.leave(roomId);
    });

    socket.on('send-to-server', async (data) => {
        console.log(username + " sent message of " + data.body + "to room " + data._id);
        io.to(data._id).emit('send-to-contact', data.body);
    });
});


export default io;