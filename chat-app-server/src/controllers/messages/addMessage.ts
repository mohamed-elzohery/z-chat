import { ObjectId } from "mongoose";
import Message from "../../models/Message";


const addMessage = async (receiver: string, sender: string, body: string) => {
    return Message.create({receiver, sender, body});
};

export default addMessage;