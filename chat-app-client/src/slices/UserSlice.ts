import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {io, Socket} from 'socket.io-client';

export type UserSliceType = {
    name: string,
    status: string;
    photo: string;
    socket: Socket | null;
}

const initialState = {
    name: 'zchat user',
    status: 'I am available now',
    photo: 'blank-profile-picture-g4da4d42d6_640.png',
    socket: null,
} as UserSliceType;

const getUserData = (state: UserSliceType, action: PayloadAction<UserSliceType>) => state = action.payload; 
const updateUserName = (state: UserSliceType, action: PayloadAction<string>) => {state.name = action.payload}; 

const updateUserPhoto = (state: UserSliceType, action: PayloadAction<string>) => {state.photo = process.env.REACT_APP_AWS_DOMAIN + action.payload}; 
const updateUserStatus = (state: UserSliceType, action: PayloadAction<string>) => {state.status = action.payload}; 

const connectToSocket = (state: UserSliceType) => {
    state.socket = io(process.env.REACT_APP_SOCKET_URL!, { transports : ['websocket', 'polling', 'flashsocket'] });
    state.socket.on('send-to-contact', message => console.log(message));

}; 

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        getUserData,
        updateUserName,
        updateUserStatus,
        updateUserPhoto,
        connectToSocket
    }
});

export const UserActions = UserSlice.actions;
export default UserSlice;