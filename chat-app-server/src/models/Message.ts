import { Schema, model } from "mongoose";


export interface MessageI {
    body: string;
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    date: Date;
    isSeen: boolean;
    isDelivered: boolean;
}  

const MessageSchema = new Schema<MessageI>({

    body: {
        type: String,
        trim: true,
        required: [true, 'Message cannnot be empty']
    },
    sender: {
        required: [true, 'sender is required'],
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    receiver: {
        required: [true, 'receiver is required'],
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now
    },
    isSeen: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false,
    }

});


const Message = model<MessageI>('Message', MessageSchema);

export default Message;