import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../utils/api'; // api.js에서 설정한 axios 인스턴스 사용

// 🔸 게시글 리스트를 가져오는 thunk
export const fetchCommunityPosts = createAsyncThunk(
  'community/fetchCommunityPosts',
  async (_, thunkAPI) => {
    try {
      // ✅ 실제 백엔드 API 요청 (나중에 사용)
      // const response = await api.get('/api/community/posts'); 
      // return response.data;

      // 🔸 지금은 임시 데이터 반환
      return [
        {
          id: '1',
          date: '20250717',
          title: '쌍용공원 플로깅 후기',
          author: '강민섭님',
          preview: '오늘은 ANA 미션 수행을 위해 쌍용공원에서...',
          imageUrl: 'https://via.placeholder.com/300x150',
        },
        {
          id: '2',
          date: '20250716',
          title: '삼거리공원 무포장 피크닉 체험',
          author: '정기찬님',
          preview: '점심 시간에 다녀왔는데 날씨가 정말 좋았어요.',
          imageUrl: 'https://via.placeholder.com/300x150',
        },
      ];
    } catch (error) {
      console.error('게시글 리스트 요청 실패:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// 게시글 상세 가져오기
// export const fetchCommunityDetail = createAsyncThunk(
//   'community/fetchDetail',
//   async (postId, thunkAPI) => {
//     try {
//       const response = await axios.get(`/api/community/posts/${postId}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
const mockPostDetails = {
  '1': {
    id: '1',
    title: '쌍용공원 플로깅 후기',
    author: '강민섭님',
    date: '2025-07-17',
    content: '오늘은 ANA 미션 수행을 위해 쌍용공원에서 플로깅을 했습니다!',
    imageUrl: 'https://via.placeholder.com/400x200.png?text=쌍용공원',
    likedByMe: false,
    likeCount: 3,
    commentCount: 5,
    comments: [
      { author: '홍길동', content: '정말 멋지네요!' },
      { author: '김철수', content: '저도 다음에 참여하고 싶어요!' },
    ]
  },
  '2': {
    id: '2',
    title: '삼거리공원 무포장 피크닉 체험',
    author: '정기찬님',
    date: '2025-07-16',
    content: '점심 시간에 다녀왔는데 날씨가 정말 좋았어요.',
    imageUrl: 'https://via.placeholder.com/400x200.png?text=삼거리공원',
    likedByMe: true,
    likeCount: 10,
    commentCount: 2,
    comments: [
      { author: '이영희', content: '부럽습니다~' },
    ]
  }
};

export const fetchCommunityDetail = createAsyncThunk(
  'community/fetchDetail',
  async (postId, thunkAPI) => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const detail = mockPostDetails[postId];
          if (detail) {
            resolve(detail);
          } else {
            reject(new Error('해당 게시글이 존재하지 않습니다.'));
          }
        }, 500);
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const postCommunity = createAsyncThunk(
  'community/postCommunity',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/community/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || '오류 발생');
    }
  }
);

export const toggleLike = createAsyncThunk(
  'community/toggleLike',
  async (postId, { rejectWithValue }) => {
    try {
      await api.post(`/api/community/posts/${postId}/like`);
      return postId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '좋아요 처리 실패');
    }
  }
);

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    posts: [],
    postDetail: null, // ✅ 객체형태
    loading: false,
    error: null,
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

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '에러 발생';
      })
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
      .addCase(toggleLike.fulfilled, (state, action) => {
        if (state.postDetail) {
          const isLiked = state.postDetail.likedByMe;
          state.postDetail.likedByMe = !isLiked;
          state.postDetail.likeCount += isLiked ? -1 : 1;
        }
      })
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
export const {resetStatus, clearDetail} = communitySlice.actions;
export default communitySlice.reducer;
