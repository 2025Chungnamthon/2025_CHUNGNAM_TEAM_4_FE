import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import missionSlice from "./slices/missionSlice";


const store = configureStore({
    reducer:{
        user:userSlice,
        mission:missionSlice,
    }
});

export default store;