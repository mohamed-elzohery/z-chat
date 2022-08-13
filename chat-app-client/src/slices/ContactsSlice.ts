import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Message = {
    _id?: string,
    body: string,
    date: string,
    isSeen: boolean,
    sender: string,
    receiver: string,
}

export type ActiveContactData = {
    _id: string,
    name: string,
    photo: string
}


export type UserData = {
    _id: string,
    name: string, 
    photo: string,
    countOfUnseenMessages: number,
    lastMessage:  Message 
}

export type ContactsSliceType = {
    contacts: UserData[],
    activeContact: ActiveContactData | null,
}

const initialState: ContactsSliceType= {
    contacts: [],
    activeContact: null
}

const sortContactsByDate: (contacts: UserData[]) =>  UserData[] = (contacts) => {

    if(contacts.length < 2) return contacts;  

    return [...contacts].sort((a,b) => {
        if(a.lastMessage && b.lastMessage){
            return new Date(b.lastMessage.date).getTime() - new Date(a.lastMessage.date).getTime();
        }else if(a.lastMessage){
            return -1;
        }else{
            return 1;
        }
    });
}


const getContacstData = (state: ContactsSliceType, action: PayloadAction<UserData[]>) => {state.contacts = [...action.payload]};



const sendMessage = (state: ContactsSliceType, action: PayloadAction<Message>) => {
    state.contacts = state.contacts.map(contact => {
        if(contact._id === action.payload.receiver){
            contact.lastMessage = action.payload;
        }
        return contact;
    });

    state.contacts = sortContactsByDate(state.contacts);
};

const recieveMessageActive = (state: ContactsSliceType, action: PayloadAction<{message: Message}>) => {
    state.contacts = state.contacts.map(contact => {
        if(contact._id === action.payload.message.sender){
            contact.lastMessage = action.payload.message;
            contact.countOfUnseenMessages = 0;
        }
        return contact;
    });

    state.contacts = sortContactsByDate(state.contacts);

};

const recieveMessageInactive = (state: ContactsSliceType, action: PayloadAction<{message: Message}>) => {
    state.contacts = state.contacts.map(contact => {
        if(contact._id === action.payload.message.sender){
            contact.lastMessage = action.payload.message;
            contact.countOfUnseenMessages += 1;
        }
        return contact;
    });

        state.contacts = sortContactsByDate(state.contacts);

};


const setActiveContact = (state: ContactsSliceType, action: PayloadAction<ActiveContactData>) => {
    state.activeContact = action.payload;

    state.contacts = state.contacts.map(contact => {
        if(contact._id === action.payload._id){
            contact.countOfUnseenMessages = 0;
        }
        return contact;
    })

};


const ContactsSlice = createSlice({
    name: 'Contacts',
    initialState,
    reducers: {
        getContacstData,
        setActiveContact,
        sendMessage,
        recieveMessageActive,
        recieveMessageInactive
    }
});

export default ContactsSlice;
export const ContactsActions = ContactsSlice.actions;