import { ObjectId } from "mongoose";
import Message from "../../models/Message";


export const getChatMessages = async (receiver: string, sender: string) => {
    return Message.find({$or: [{receiver,sender}, {receiver: sender, sender: receiver}]}).sort({date: 1});
};

export const markAllAsSeen = async (receiver: string, sender: string) => {
    return Message.updateMany({$and: [{sender: receiver}, {receiver: sender}, {isSeen: false}]}, {isSeen: true}, {new: true})
};

export const markAllAsDelivered = async ( sender: string) => {
    return Message.updateMany({$and: [{receiver: sender}, {isDelivered: false}]}, {isDelivered: true}, {new: true})
};

