import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import showToast from '../../components/ToastMessage';

// 1. 챌린지 목록 조회
export const fetchChallenges = createAsyncThunk(
  'challenges/fetchChallenges',
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/admin/challenges?status=${status}`);
      console.log("response: ",response.data.challengeList);
      return response.data.challengeList;
    } catch (error) {
        console.log("error: ",error)
      showToast("❌ "+error?.response.data.message || "정보 불러오기 실패");                
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 2. 챌린지 상세 조회
export const fetchChallengeDetail = createAsyncThunk(
  'challenges/fetchChallengeDetail',
  async (challengeId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/admin/challenges/${challengeId}`);
      console.log("response data",response.data)
      return response.data;
    } catch (error) {
      console.log("error: ",error.response.data.message);
      showToast("❌ "+error?.response.data.message || "정보 불러오기 실패");        
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 3. 챌린지 승인
export const approveChallenge = createAsyncThunk(
  'challenges/approveChallenge',
  async (challengeId, { rejectWithValue }) => {
    try {
      console.log("approve start");
      const response = await api.patch(`/api/admin/challenges/${challengeId}/approve`);
      console.log("response data",response.data)
      showToast("✅ "+"미션 승인");
      return response.data;
    } catch (error) {
      console.log("error: ",error.response.data.message);
      showToast("❌ "+error?.response.data.message || "미션 승인 실패");        
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 4. 챌린지 거절
export const rejectChallenge = createAsyncThunk(
  'challenges/rejectChallenge',
  async ({challengeId,reject_reason}, { rejectWithValue }) => {
    try {
      console.log("start")
      const response = await api.patch(`/api/admin/challenges/${challengeId}/reject`,{reject_reason});
      console.log("response data",response.data)
      showToast("✅ "+"미션 반려");
      return response.data;
    } catch (error) {
      console.log("error: ",error);
      showToast("❌ "+error?.response.data.message || "미션 반려 실패");        
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Slice
const challengeSlice = createSlice({
  name: 'challenges',
  initialState: {
    challengeList: [],
    selectedChallenge: null,
    loading: {
      fetchChallenges: false,
      fetchChallengeDetail: false,
      approveChallenge: false,
      rejectChallenge: false,
    },
    success: {
      fetchChallenges: false,
      fetchChallengeDetail: false,
      approveChallenge: false,
      rejectChallenge: false,
    },
    error: {
      fetchChallenges: null,
      fetchChallengeDetail: null,
      approveChallenge: null,
      rejectChallenge: null,
    }
  },
  reducers: {
    clearSelectedChallenge: (state) => {
      state.selectedChallenge = null;
    },
    clearApproveChallenge: (state) => {
      state.success.approveChallenge=false;
    },
    clearRejectChallenge: (state)=>{
      state.success.rejectChallenge=false;
    }
  },
  extraReducers: (builder) => {
    builder

      // 목록 조회
      .addCase(fetchChallenges.pending, (state) => {
        state.loading.fetchChallenges = true;
        state.success.fetchChallenges = false;
        state.error.fetchChallenges = null;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.loading.fetchChallenges = false;
        state.success.fetchChallenges = true;
        state.challengeList = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.loading.fetchChallenges = false;
        state.error.fetchChallenges = action.payload;
      })

      // 상세 조회
      .addCase(fetchChallengeDetail.pending, (state) => {
        state.loading.fetchChallengeDetail = true;
        state.success.fetchChallengeDetail = false;
        state.error.fetchChallengeDetail = null;
      })
      .addCase(fetchChallengeDetail.fulfilled, (state, action) => {
        state.loading.fetchChallengeDetail = false;
        state.success.fetchChallengeDetail = true;
        state.selectedChallenge = action.payload;
      })
      .addCase(fetchChallengeDetail.rejected, (state, action) => {
        state.loading.fetchChallengeDetail = false;
        state.error.fetchChallengeDetail = action.payload;
      })

      // 승인 처리
      .addCase(approveChallenge.pending, (state) => {
        state.loading.approveChallenge = true;
        state.success.approveChallenge = false;
        state.error.approveChallenge = null;
      })
      .addCase(approveChallenge.fulfilled, (state, action) => {
        state.loading.approveChallenge = false;
        state.success.approveChallenge = true;
        state.challengeList = state.challengeList.filter(challenge => challenge.challenge_id !== action.payload);
      })
      .addCase(approveChallenge.rejected, (state, action) => {
        state.loading.approveChallenge = false;
        state.error.approveChallenge = action.payload;
      })

      // 거절 처리
      .addCase(rejectChallenge.pending, (state) => {
        state.loading.rejectChallenge = true;
        state.success.rejectChallenge = false;
        state.error.rejectChallenge = null;
      })
      .addCase(rejectChallenge.fulfilled, (state, action) => {
        state.loading.rejectChallenge = false;
        state.success.rejectChallenge = true;
        state.challengeList = state.challengeList.filter(challenge => challenge.challenge_id !== action.payload);
      })
      .addCase(rejectChallenge.rejected, (state, action) => {
        state.loading.rejectChallenge = false;
        state.error.rejectChallenge = action.payload;
      });
  }
});

export const { clearSelectedChallenge, clearApproveChallenge, clearRejectChallenge } = challengeSlice.actions;

export default challengeSlice.reducer;
