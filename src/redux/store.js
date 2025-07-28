import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import missionSlice from "./slices/missionSlice";
import userMissionSlice from "./slices/userMissionSlice";
import challengeSlice from "./slices/challengeSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        mission:missionSlice,
        userMission:userMissionSlice,
        challenge:challengeSlice,
    }
});

export default store;