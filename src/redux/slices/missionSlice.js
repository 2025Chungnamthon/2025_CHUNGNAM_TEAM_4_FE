import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

// AI 미션들 생성 (POST /api/admin/ai-missions/generate)
export const createMissionList = createAsyncThunk(
  'missions/createMissionList',
  async ({ type, category }, {dispatch, rejectWithValue}) => {
    try {
    //     console.log("post",`/api/admin/ai-missions/generate?type=${type}&category=${category}&size=10`);
    //   const response = await api.post(`/api/admin/ai-missions/generate?type="${type}"&category="${category}"&size=10`);
      console.log("post",`/api/admin/ai-missions/generate?category=${category}&type=${type}&size=10`);
      const response = await api.post(`/api/admin/ai-missions/generate?type=${type}&category=${category}&size=10`);    
      console.log("response",response.data)
      dispatch(fetchMissions({status:'CREATE'})); 
      return response.data;
    } catch (error) {
        console.log("error",error)
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 미션 생성 (POST /api/admin/missions)
export const createMission = createAsyncThunk(
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
      // console.log(response.data);
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
  async ({missionId}, { dispatch, rejectWithValue }) => {
    try {
      console.log("hello");
      console.log(missionId)
      const response = await api.patch(`/api/admin/missions/${missionId}/activate`);
      dispatch(fetchMissions({status:'CREATE'}));
      return response.data; // 활성화된 미션 반환
    } catch (error) {
      console.log("error",error.response.data.message)
      return rejectWithValue(error.response.data.message); // 실패 시 에러 메시지 반환
    }
  }
);

// 미션 반려 (DELETE /api/admin/missions/{missionId}/delete)
export const deleteMission = createAsyncThunk(
  'missions/deleteMission', 
  async ({missionId}, { dispatch, rejectWithValue }) => {
    try {
      console.log("hello");
      console.log(missionId)      
      const response = await api.patch(`/api/admin/missions/${missionId}/delete`);
      dispatch(fetchMissions({status:'CREATE'}));
      return response.data; // 삭제된 미션 반환
    } catch (error) {
      console.log("error",error.response.data.message)      
      return rejectWithValue(error.response.data.message); // 실패 시 에러 메시지 반환
    }
  }
);

// 미션 수정 (PATCH /api/admin/missions/{missionId})
export const updateMission = createAsyncThunk(
  'missions/updateMission', 
  async ({ missionId, updatedData }, { dispatch, rejectWithValue }) => {
    try {
      console.log("missionId",missionId);
      console.log("updatedData",updatedData);
      const response = await api.patch(`/api/admin/missions/${missionId}`, updatedData);
      console.log(response.data)
      dispatch(fetchMissions({status:'CREATE'}));      
      return response.data; // 수정된 미션 반환
    } catch (error) {
      console.log(error.response.data.message)
      return rejectWithValue(error.response.data.message); // 실패 시 에러 메시지 반환
    }
  }
);



const missionSlice = createSlice({
  name: "mission",
  initialState: {
    missionList: [],
    loading: {
      createMissionList: false,
      fetchMissions: false,
      createMission: false,
      activateMission: false,
      deleteMission: false,
      updateMission: false,
    },
    success: {
      createMissionList: false,
      fetchMissions: false,
      createMission: false,
      activateMission: false,
      deleteMission: false,
      updateMission: false,
    },
    error: {
      createMissionList: null,
      fetchMissions: null,
      createMission: null,
      activateMission: null,
      deleteMission: null,
      updateMission: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createMissionList.pending, (state) => {
        state.loading.createMissionList = true;
        state.success.createMissionList = false;
        state.error.createMissionList = null;
      })
      .addCase(createMissionList.fulfilled, (state, action) => {
        state.loading.createMissionList = false;
        state.success.createMissionList = true;
        state.missionList = action.payload;
      })
      .addCase(createMissionList.rejected, (state, action) => {
        state.loading.createMissionList = false;
        state.error.createMissionList = action.payload;
      })

      // ✅ fetchMissions
      .addCase(fetchMissions.pending, (state) => {
        state.loading.fetchMissions = true;
        state.success.fetchMissions = false;
        state.error.fetchMissions = null;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.loading.fetchMissions = false;
        state.success.fetchMissions = true;
        state.missionList = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.loading.fetchMissions = false;
        state.error.fetchMissions = action.payload;
      })

      // ✅ createMission
      .addCase(createMission.pending, (state) => {
        state.loading.createMission = true;
        state.success.createMission = false;
        state.error.createMission = null;
      })
      .addCase(createMission.fulfilled, (state, action) => {
        state.loading.createMission = false;
        state.success.createMission = true;
        // state.missionList.push(action.payload); // 예시로 추가
      })
      .addCase(createMission.rejected, (state, action) => {
        state.loading.createMission = false;
        state.error.createMission = action.payload;
      })

      // ✅ activateMission
      .addCase(activateMission.pending, (state) => {
        state.loading.activateMission = true;
        state.success.activateMission = false;
        state.error.activateMission = null;
      })
      .addCase(activateMission.fulfilled, (state) => {
        state.loading.activateMission = false;
        state.success.activateMission = true;
      })
      .addCase(activateMission.rejected, (state, action) => {
        state.loading.activateMission = false;
        state.error.activateMission = action.payload;
      })

      // ✅ deleteMission
      .addCase(deleteMission.pending, (state) => {
        state.loading.deleteMission = true;
        state.success.deleteMission = false;
        state.error.deleteMission = null;
      })
      .addCase(deleteMission.fulfilled, (state) => {
        state.loading.deleteMission = false;
        state.success.deleteMission = true;
      })
      .addCase(deleteMission.rejected, (state, action) => {
        state.loading.deleteMission = false;
        state.error.deleteMission = action.payload;
      })

      // ✅ updateMission
      .addCase(updateMission.pending, (state) => {
        state.loading.updateMission = true;
        state.success.updateMission = false;
        state.error.updateMission = null;
      })
      .addCase(updateMission.fulfilled, (state, action) => {
        state.loading.updateMission = false;
        state.success.updateMission = true;
        const index = state.missionList.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.missionList[index] = action.payload;
        }
      })
      .addCase(updateMission.rejected, (state, action) => {
        state.loading.updateMission = false;
        state.error.updateMission = action.payload;
      });
  },
});

export default missionSlice.reducer;