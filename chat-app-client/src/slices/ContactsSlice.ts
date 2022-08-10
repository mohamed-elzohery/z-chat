import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Message = {
    body: string,
    date: string,
    isSeen: boolean,
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

const getContacstData = (state: ContactsSliceType, action: PayloadAction<ContactsSliceType>) => {state.contacts = [...action.payload.contacts]};

const setActiveContact = (state: ContactsSliceType, action: PayloadAction<ActiveContactData>) => {
    state.activeContact = action.payload;
};


const ContactsSlice = createSlice({
    name: 'Contacts',
    initialState,
    reducers: {
        getContacstData,
        setActiveContact
    }
});

export default ContactsSlice;
export const ContactsActions = ContactsSlice.actions;