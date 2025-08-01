import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import showToast from '../../components/ToastMessage';

// 게시글 목록 조회 (페이징, 정렬 지원)
export const fetchCommunityPosts = createAsyncThunk(
  'community/fetchCommunityPosts',
  async ({ page = 0, limit = 10, sort = 'date' } = {}, thunkAPI) => {
    try {
      const response = await api.get(`/api/users/community/posts?page=${page}&limit=${limit}&sort=${sort}`);
      return response.data;
    } catch (error) {
      console.error('게시글 리스트 요청 실패:', error);
      showToast("❌ "+error?.response.data.message || "정보 불러오기 실패");      

      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 게시글 상세 조회
export const fetchCommunityDetail = createAsyncThunk(
  'community/fetchDetail',
  async (postId, thunkAPI) => {
    try {
      const response = await api.get(`/api/users/community/posts/${postId}`);
      return response.data;
    } catch (error) {
      showToast("❌ "+error?.response.data.message || "정보 불러오기 실패");        
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 게시글 작성
export const postCommunity = createAsyncThunk(
  'community/postCommunity',
  async (formData, { dispatch,rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/community/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showToast("✅ "+"게시물 등록 성공");
      dispatch(fetchCommunityPosts());
      return response.data;
    } catch (err) {
      console.log(err);
      showToast("❌ "+error?.response.data.message || "게시물 등록 실패");        
      return rejectWithValue(err.response?.data || '오류 발생');
    }
  }
);

// 좋아요 토글
export const toggleLike = createAsyncThunk(
  'community/toggleLike',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/users/community/posts/${postId}/like`);
      showToast("✅ "+"좋아요");
      return { postId, isLiked: response.data.liked };
    } catch (error) {
      showToast("❌ "+error?.response.data.message || "서버 오류");        

      return rejectWithValue(error.response?.data || '좋아요 처리 실패');
    }
  }
);

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    posts: [],
    postDetail: null,
    loading: false,
    error: null,
    success: false,
    pagination: {
      currentPage: 0,
      totalPages: 0,
      totalElements: 0,
      size: 10,
      hasNext: false,
      hasPrevious: false,
    },
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearDetail: (state) => {
      state.postDetail = null;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.pagination = {
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        size: 10,
        hasNext: false,
        hasPrevious: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // 게시글 목록 조회
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
          size: action.payload.size,
          hasNext: action.payload.hasNext,
          hasPrevious: action.payload.hasPrevious,
        };
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '에러 발생';
      })
      // 게시글 상세 조회
      .addCase(fetchCommunityDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommunityDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.postDetail = action.payload;
      })
      .addCase(fetchCommunityDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 좋아요 토글
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, isLiked } = action.payload;
        
        // 상세 화면에서 좋아요 상태 업데이트
        if (state.postDetail && state.postDetail.id === postId) {
          state.postDetail.liked = isLiked;
          // isLiked가 true면 +1, false면 -1
          if (isLiked) {
            state.postDetail.likeCount += 1;
          } else {
            state.postDetail.likeCount -= 1;
          }
        }
        
        // 목록에서 좋아요 상태 업데이트
        const postIndex = state.posts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].liked = isLiked;
          // isLiked가 true면 +1, false면 -1
          if (isLiked) {
            state.posts[postIndex].likeCount += 1;
          } else {
            state.posts[postIndex].likeCount -= 1;
          }
        }
      })
      // 게시글 작성
      .addCase(postCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCommunity.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(postCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, clearDetail, clearPosts } = communitySlice.actions;
export default communitySlice.reducer;
