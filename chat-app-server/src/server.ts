import mongoose from 'mongoose';
import app from './app';

//Connecting to database
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(process.env.PORT || 5000);
        console.log("Connected to database successfully");
        console.log("Server is running on port " + process.env.PORT);
    } catch (err) {
        console.log("Error on DB Connecting: " + err.message);
        process.exit(1);
    }
})();
