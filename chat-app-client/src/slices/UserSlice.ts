import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type UserSliceType = {
    name: string,
    status: string;
    photo: string;
}

const initialState = {
    name: 'zchat user',
    status: 'I am available now',
    photo: 'blank-profile-picture-g4da4d42d6_640.png'
} as UserSliceType;

const getUserData = (state: UserSliceType, action: PayloadAction<UserSliceType>) => state = action.payload; 
const updateUserName = (state: UserSliceType, action: PayloadAction<string>) => {state.name = action.payload}; 
const updateUserPhoto = (state: UserSliceType, action: PayloadAction<string>) => {state.photo = process.env.REACT_APP_AWS_DOMAIN + action.payload}; 
const updateUserStatus = (state: UserSliceType, action: PayloadAction<string>) => {state.status = action.payload}; 

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        getUserData,
        updateUserName,
        updateUserStatus,
        updateUserPhoto
    }
});

export const UserActions = UserSlice.actions;
export default UserSlice;