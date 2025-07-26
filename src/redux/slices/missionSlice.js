import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

// AI 미션들 생성 (POST /api/admin/ai-missions/generate)
export const createMissionList = createAsyncThunk(
  'missions/createMissionList',
  async ({ type, category }, {rejectWithValue}) => {
    try {
    //     console.log("post",`/api/admin/ai-missions/generate?type=${type}&category=${category}&size=10`);
    //   const response = await api.post(`/api/admin/ai-missions/generate?type="${type}"&category="${category}"&size=10`);
        console.log("post",`/api/admin/ai-missions/generate?category=${category}&type=${type}&size=10`);
      const response = await api.post(`/api/admin/ai-missions/generate?type="${type}"&category="${category}"&size=10`);    
      console.log("response",response.data)
      return response.data;
    } catch (error) {
        console.log("error",error.response.data.message)
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 미션 생성 (POST /api/admin/missions)
export const createMissions = createAsyncThunk(
  'missions/createMission', 
  async ({ rejectWithValue }) => {
    try {
        console.log("createMissions start");
      const response = await api.post('/api/admin/missions');
      console.log(response.data);
      return response.data; // 생성된 미션 반환
    } catch (error) {
        console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message); // 실패 시 에러 메시지 반환
    }
  }
);

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions', 
  async ({status},{ rejectWithValue }) => {
    try {
        //CREATE,ACTIVATE,DELETE
      const response = await api.get(`/api/admin/missions?status=${status}`);
      console.log(response.data);
      return response.data.mission_list; // 반환되는 미션 목록
    } catch (error) {
        console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message); // 실패 시 에러 메시지 반환
    }
  }
);

// 미션 승인 (PATCH /api/admin/missions/{missionId}/activate)
export const activateMission = createAsyncThunk(
  'missions/activateMission',
  async (missionId, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/admin/missions/${missionId}/activate`);
    //   dispatch(fetchMissions({status:'CREATE'}));
      return response.data; // 활성화된 미션 반환
    } catch (error) {
      return rejectWithValue(error.response.data.message); // 실패 시 에러 메시지 반환
    }
  }
);

// 미션 반려 (DELETE /api/admin/missions/{missionId}/delete)
export const deleteMission = createAsyncThunk(
  'missions/deleteMission', 
  async (missionId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/admin/missions/${missionId}/delete`);
    //   dispatch(fetchMissions({status:'CREATE'}));
      return response.data; // 삭제된 미션 반환
    } catch (error) {
      return rejectWithValue(error.response.data.message); // 실패 시 에러 메시지 반환
    }
  }
);

// 미션 수정 (PATCH /api/admin/missions/{missionId})
export const updateMission = createAsyncThunk(
  'missions/updateMission', 
  async ({ missionId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/admin/missions/${missionId}`, updatedData);
    //   dispatch(fetchMissions({status:'CREATE'}));      
      return response.data; // 수정된 미션 반환
    } catch (error) {
      return rejectWithValue(error.response.data.message); // 실패 시 에러 메시지 반환
    }
  }
);

const missionSlice = createSlice({
    name:"mission",
    initialState:{
        AIMissionList: [],
        loading: false,
        error: null,
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
            .addCase(createMissionList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMissionList.fulfilled, (state, action) => {
                state.loading = false;
                state.missionList = action.payload;
            })
            .addCase(createMissionList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMissions.fulfilled, (state, action) => {
                state.loading = false;
                state.AIMissionList = action.payload;
            })
            .addCase(fetchMissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export default missionSlice.reducer;