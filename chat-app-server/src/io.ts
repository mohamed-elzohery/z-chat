import {Server} from 'socket.io';
import jwt, {JwtPayload} from 'jsonwebtoken';
import BadRequest from './utils/errors/BadRequest';
import User, { UserI } from './models/User';
import server from './server';
import { IncomingMessage } from 'http';
import {getChatMessages, markAllAsSeen} from './controllers/messages/getChatMessages';
import mongoose from 'mongoose';
import addMessage from './controllers/messages/addMessage';

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
    const sender = (socket.request as AuthenticatedMessage).user._id;
    const username = (socket.request as AuthenticatedMessage).user.name;
    await socket.join(sender.toString());
    console.log(io.sockets.adapter.rooms);
    console.log(`${username} joined to room ${sender}`);

    socket.on('load-messages', async (receiverId: string) => {
        await markAllAsSeen(receiverId, sender);
        const messages = await getChatMessages(receiverId, sender);
        socket.emit('load-messages', messages);
    });

    socket.on('send-to-server', async (messageSent) => {
        console.log(username + " sent message of " + messageSent.body + "to room " + messageSent.receiver);
        const message = await addMessage(messageSent.receiver, sender, messageSent.body);
        io.to(messageSent.receiver).emit('send-to-contact', message);
    });

    socket.on('read-all', async (receiverId: string) => {
        await markAllAsSeen(receiverId, sender);
    })

});


export default io;