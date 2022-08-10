import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Message = {
    body: string,
    date: string,
    isSeen: boolean,
}


export type UserData = {
    _id?: string,
    name: string, 
    photo: string,
    countOfUnseenMessages: number,
    lastMessage:  Message
}

export type ContactsSliceType = {
    contacts: UserData[],
}

const initialState = {
    contacts: []
}

const getContacstData = (state: ContactsSliceType, action: PayloadAction<ContactsSliceType>) => {state.contacts = [...action.payload.contacts]};

const ContactsSlice = createSlice({
    name: 'Contacts',
    initialState,
    reducers: {
        getContacstData
    }
});

export default ContactsSlice;
export const ContactsActions = ContactsSlice.actions;