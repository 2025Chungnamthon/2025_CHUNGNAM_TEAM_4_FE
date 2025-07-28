import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 1. 사용자 메인 정보 조회
// export const fetchUserMainInfo = createAsyncThunk(
//   'userMissions/fetchUserMainInfo',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get('/api/users/main');
//       console.log("user info",response.data)
//       return response.data;
//     } catch (error) {
//       console.log(error.response.data.message);
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// 2. 미션 목록 조회
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 3. 미션 상세 조회
export const fetchMissionDetail = createAsyncThunk(
  'userMissions/fetchMissionDetail',
  async (missionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/missions/${missionId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 4. 미션 선택
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 5. 미션 제출
export const submitMission = createAsyncThunk(
  'userMissions/submitMission',
  async ({ userMissionId, description, images }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // ✅ 각각 별도로 추가 (RequestParam)
      formData.append('userMissionId', String(userMissionId));
      formData.append('description', description);

      console.log("images",images)

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

      return response.data;
    } catch (error) {
      console.log("error: ", error);
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
    }
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

      .addCase(selectMissions.fulfilled, (state, action) => {
        // 선택된 결과 반영은 필요에 따라 구현
      })

      .addCase(submitMission.fulfilled, (state, action) => {
        state.submissionResult = action.payload;
      })

      .addCase(submitMission.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { clearSubmissionResult } = userMissionSlice.actions;

export default userMissionSlice.reducer;
