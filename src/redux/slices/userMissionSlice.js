import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { logoutUser } from './userSlice';
import showToast from '../../components/ToastMessage';

// 1. 미션 목록 조회
export const fetchUserMissions = createAsyncThunk(
  'userMissions/fetchUserMissions',
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetchUserMissions start")
      const response = await api.get('/api/missions');
      console.log("usermissionlist",response.data)
      return response.data;
    } catch (error) {
      console.log(error)
      showToast("❌ "+error?.response.data.message || "정보 불러오기 실패");        
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 2. 미션 상세 조회
export const fetchMissionDetail = createAsyncThunk(
  'userMissions/fetchMissionDetail',
  async (missionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/missions/${missionId}`);
      return response.data;
    } catch (error) {
      showToast("❌ "+error?.response.data.message || "정보 불러오기 실패");        
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 3. 미션 선택
export const selectMissions = createAsyncThunk(
  'userMissions/selectMissions',
  async ({ dailyMissionIds , weeklyMissionIds }, { rejectWithValue }) => {
    try {
      console.log(dailyMissionIds, weeklyMissionIds)
      const response = await api.post('/api/missions/choice', {
        dailyMissionIds,
        weeklyMissionIds
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message)
      showToast("❌ "+error?.response.data.message || "미션 제출 실패");        
      return rejectWithValue(error.response.data.message);
    }
  }
);

//4. 미션 제출
export const submitMission = createAsyncThunk(
  'userMissions/submitMission',
  async ({ userMissionId, description, images }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // ✅ 각각 별도로 추가 (RequestParam)
      formData.append('userMissionId', String(userMissionId));
      formData.append('description', description);

      // console.log("images",images)
      console.log("userMissionID",userMissionId)

      // ✅ 이미지들 추가 (RequestPart)
      images.forEach((img, index) => {
        formData.append('images', {
          uri: img.uri,
          name: img.name || `image${index}.jpg`,
          type: img.type || 'image/jpeg',
        });
      });

      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const response = await api.post('/api/missions/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // boundary는 Axios가 자동 처리
        },
      });

      console.log("response",response.data)
      showToast("✅ "+"미션을 제출했습니다!");
      return response.data;
    } catch (error) {
      console.log("error: ", error.response.data);
      showToast("❌ "+error?.response.data.message || "미션 제출 실패");        
      return rejectWithValue(error.response?.data?.message || '제출 실패');
    }
  }
);


// 🔧 Slice
const userMissionSlice = createSlice({
  name: 'userMission',
  initialState: {
    // userInfo: null,
    dailyMissionSelected:null,
    weeklyMissionSelected:null,
    dailyMissions: [],
    weeklyMissions: [],
    userDailyMissions: [],
    userWeeklyMissions: [],
    missionDetail: null,
    // isLoading: false,
    // error: null,
    submissionResult: null,
    
    
    loading: {
        // fetchUserMainInfo: false,
        fetchUserMissions: false,
        fetchMissionDetail: false,
        selectMissions: false,
        submitMission: false,
    },

    success: {
        // fetchUserMainInfo: false,
        fetchUserMissions: false,
        fetchMissionDetail: false,
        selectMissions: false,
        submitMission: false,
    }, 

    error: {
        // fetchUserMainInfo: null,
        fetchUserMissions: null,
        fetchMissionDetail: null,
        selectMissions: null,
        submitMission: null,
    },    
  },
  reducers: {
    clearSubmissionResult: (state) => {
      state.submissionResult = null;
    },
    clearSubmitResultSuccess: (state)=>{
      state.success.submitMission=false;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUserMainInfo.pending, (state) => {
      //   state.loading.fetchUserMainInfo = true;
      // })
      // .addCase(fetchUserMainInfo.fulfilled, (state, action) => {
      //   state.loading.fetchUserMainInfo = false;
      //   const { userInfo, dailyMissions, weeklyMissions } = action.payload;
      //   state.userInfo = userInfo;
      //   state.userDailyMissions = dailyMissions || [];
      //   state.userWeeklyMissions = weeklyMissions || [];
      // })
      // .addCase(fetchUserMainInfo.rejected, (state, action) => {
      //   state.loading.fetchUserMainInfo = false;
      //   state.error.fetchUserMainInfo = action.payload;
      // })
      .addCase(fetchUserMissions.pending,(state)=>{
        state.loading.fetchUserMissions=true;
      })
      .addCase(fetchUserMissions.fulfilled, (state, action) => {
        const {
          dailyMissionSelected,
          weeklyMissionSelected,
          userDailyMissions,
          userWeeklyMissions,
          dailyMissions,
          weeklyMissions,
        } = action.payload;
        state.loading.fetchUserMissions=false;        
        state.dailyMissionSelected = dailyMissionSelected;
        state.weeklyMissionSelected = weeklyMissionSelected;
        state.userDailyMissions = userDailyMissions;
        state.userWeeklyMissions = userWeeklyMissions;
        state.dailyMissions = dailyMissions;
        state.weeklyMissions = weeklyMissions;
        state.success.fetchUserMissions = true;
      })
      .addCase(fetchUserMissions.rejected, (state, action) => {
        state.loading.fetchUserMissions = false;
        state.error.fetchUserMissions = action.payload;
      })
      .addCase(fetchMissionDetail.fulfilled, (state, action) => {
        state.missionDetail = action.payload;
      })

      .addCase(selectMissions.pending, (state, action) => {
        state.loading.selectMissions = true;
        state.success.selectMissions = false;
        state.error.selectMissions = null;
      })
      .addCase(selectMissions.fulfilled, (state, action) => {
        state.loading.selectMissions = false;
        state.success.selectMissions = true;
      })
      .addCase(selectMissions.rejected, (state, action) => {
        state.loading.selectMissions = false;
        state.error.selectMissions = action.payload;
      })            
      .addCase(submitMission.pending, (state, action) => {
        state.loading.submitMission = true;
        state.success.submitMission = false;
        state.error.submitMission = null;
      })
      .addCase(submitMission.fulfilled, (state, action) => {
        state.loading.submitMission = false;
        state.success.submitMission = true;
      })
      .addCase(submitMission.rejected, (state, action) => {
        state.loading.submitMission = false;
        state.error.submitMission = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.loading.logoutUser = true;
        state.success.logoutUser = false;
        state.error.logoutUser = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading.logoutUser = false;
        state.success.logoutUser = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading.logoutUser = false;
        state.error.logoutUser = action.payload;
      })      
  }
});

export const { clearSubmissionResult, clearSubmitResultSuccess } = userMissionSlice.actions;

export default userMissionSlice.reducer;
