import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket} from 'socket.io-client';

export type UserSliceType = {
    _id: string,
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

const connectToSocket = (state: UserSliceType,action: PayloadAction<Socket>) => {
    state.socket = action.payload;
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