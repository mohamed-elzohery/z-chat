import { ObjectId } from "mongoose";
import Message from "../../models/Message";


const addMessage = async (receiver: ObjectId, sender: ObjectId, body: string) => {
    return Message.create({receiver, sender, body});
};

export default addMessage;