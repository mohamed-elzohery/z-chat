import { configureStore } from "@reduxjs/toolkit";
import UISlice from "./slices/UISlice";
import UserSlice from "./slices/UserSlice";


const reducer = {
    UI: UISlice.reducer,
    User: UserSlice.reducer
}

const store = configureStore({
    reducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;