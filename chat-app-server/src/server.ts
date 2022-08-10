import mongoose from 'mongoose';
import app from './app';
import * as http from "http";

const server = http.createServer(app);

 
//Connecting to database
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        server.listen(process.env.PORT || 5000);
        await import('./io');
        console.log("Connected to database successfully");
        console.log("Server is running on port " + process.env.PORT);
    } catch (err) {
        console.log("Error on DB Connecting: " + err.message);
        process.exit(1);
    }
})();

export default server;
