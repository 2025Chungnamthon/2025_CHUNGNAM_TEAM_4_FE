// redux/slices/pointSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 📌 포인트 사용 내역 조회
export const fetchPointHistory = createAsyncThunk(
  'points/fetchPointHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/points/history');
      console.log("point response", response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '포인트 내역 조회 실패');
    }
  }
);

// 📌 포인트 결제 (ADMIN만 가능)
export const payWithPoints = createAsyncThunk(
  'points/payWithPoints',
  async ({ userId, points, shop_name }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/pay/point', {
        userId,
        points,
        shop_name,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '포인트 결제 실패');
    }
  }
);

const pointSlice = createSlice({
  name: 'points',
  initialState: {
    pointHistory: [],
    retentionPoints: 0,
    payResult: null,
    loading: {
      fetchPointHistory: false,
      payWithPoints: false,
    },
    error: null,
  },
  reducers: {
    clearPayResult(state) {
      state.payResult = null;
    },
    clearPointError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 포인트 사용 내역 조회
      .addCase(fetchPointHistory.pending, (state) => {
        state.loading.fetchPointHistory = true;
        state.error = null;
      })
      .addCase(fetchPointHistory.fulfilled, (state, action) => {
        state.loading.fetchPointHistory = false;
        state.pointHistory = action.payload.point_history;
        state.retentionPoints = action.payload.retention_points;
      })
      .addCase(fetchPointHistory.rejected, (state, action) => {
        state.loading.fetchPointHistory = false;
        state.error = action.payload;
      })

      // 포인트 결제
      .addCase(payWithPoints.pending, (state) => {
        state.loading.payWithPoints = true;
        state.error = null;
      })
      .addCase(payWithPoints.fulfilled, (state, action) => {
        state.loading.payWithPoints = false;
        state.payResult = action.payload;
        state.retentionPoints = action.payload.total_points;
      })
      .addCase(payWithPoints.rejected, (state, action) => {
        state.loading.payWithPoints = false;
        state.error = action.payload;
      });
  },
});

export const { clearPayResult, clearPointError } = pointSlice.actions;
export default pointSlice.reducer;
