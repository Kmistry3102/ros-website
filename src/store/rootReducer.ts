import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/features/auth/auth.slice"

const rootReducer = combineReducers({
        auth : authSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;