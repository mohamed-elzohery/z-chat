import { createSlice } from "@reduxjs/toolkit";

export type UIState = {
    isProfileEditorOpen: boolean,
    isCropperOpen: boolean;
}

const initialState = {
    isProfileEditorOpen: false,
    isCropperOpen: false,
}

const openProfileEditor = (state: UIState) => {state.isProfileEditorOpen = true};
const closeProfileEditor = (state: UIState) => {state.isProfileEditorOpen = false};

const openCropper = (state: UIState) => {state.isCropperOpen = true};
const closeCropper = (state: UIState) => {state.isCropperOpen = false}; 

const UISlice = createSlice({
    name: 'UISlice',
    initialState,
    reducers: {
        openProfileEditor,
        closeProfileEditor,
        openCropper,
        closeCropper,
        reset: () => initialState,
    }
});

export const UIActions = UISlice.actions;
export default UISlice;