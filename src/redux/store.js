import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import missionReducer from "./slices/missionSlice";


const store = configureStore({
    reducer:{
        user:userReducer,
        mission:missionReducer,
    }
});

export default store;