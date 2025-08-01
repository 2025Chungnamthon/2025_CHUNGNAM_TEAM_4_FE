import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import missionSlice from "./slices/missionSlice";
import userMissionSlice from "./slices/userMissionSlice";
import challengeSlice from "./slices/challengeSlice";
import communitySlice from "./slices/communitySlice";
import pointSlice from "./slices/pointSlice";


const store = configureStore({
    reducer:{
        user:userSlice,
        mission:missionSlice,
        userMission:userMissionSlice,
        challenge:challengeSlice,
        community:communitySlice,
        point:pointSlice,
    }
});

export default store;