import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import missionSlice from "./slices/missionSlice";
import userMissionSlice from "./slices/userMissionSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        mission:missionSlice,
        userMission:userMissionSlice,
    }
});

export default store;