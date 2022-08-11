import { ObjectId } from "mongoose";
import Message from "../../models/Message";


const getChatMessages = async (receiver: string, sender: string) => {
    return Message.find({$or: [{receiver,sender}, {receiver: sender, sender: receiver}]}).sort({date: 1});
};

export default getChatMessages;