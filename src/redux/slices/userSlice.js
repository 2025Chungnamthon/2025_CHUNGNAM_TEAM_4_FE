import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { deleteTokens, saveAccessToken, saveRefreshToken } from "../../utils/tokenStorage";
import { Alert } from "react-native";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/sign-in", { email, password })
      // const response = await fetch(`https://chungnam4team-g9e7dze4hhdnhccg.koreacentral-01.azurewebsites.net/api/users/sign-in`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });  


      console.log("response 응답",response.data); 

      const accessToken = response.data.accessToken
      const refreshToken = response.data.refreshToken
      if(accessToken){
        await saveAccessToken(accessToken)
      }
      if(refreshToken){
        await saveRefreshToken(refreshToken);
      }

      return response.data;
    } catch (error) {
        console.log("errorrr",error)
      return rejectWithValue(error.response.data.message);
    }
  }
)

export const checkEmailDup = createAsyncThunk(
    "register/checkEmailDup",
    async(
      {email},
      {rejectWithValue}
    )=>{
      try{
        console.log("email: ", email)
        const response = await api.get(`/api/users/check-email?email=${email}`)
        console.log(response.data)

        if (response.data.exists===false) {
          Alert.alert("중복 확인",response.data.message);
        } else{
          Alert.alert("중복 확인",response.data.message)
        }

        return response.data;
      }catch(error){
        console.log("error: ",error.response.data);
        Alert.alert("중복 확인",error.response.data.message);        
        return rejectWithValue(error.response.data.message);
      }
    }
  )

export const registerUser = createAsyncThunk(
    "register/registerUser",
    async(
      {email,nickname,password},
      {rejectWithValue}
    )=>{
      try{
        const response = await api.post("/api/users/sign-up",{email,nickname,password})
        console.log(response.data);

        return response.data;
      }catch(error){
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
)

// 1. 사용자 메인 정보 조회
export const fetchUserMainInfo = createAsyncThunk(
  'userMissions/fetchUserMainInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/users/main');
      console.log("user info",response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/logout'); // accessToken은 api 인터셉터에 의해 자동 포함
      console.log("response",response.data);
      await deleteTokens(); // SecureStorage 토큰 삭제
      dispatch(clearUserInfo());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || '로그아웃 실패');
    }
  }
);


const userSlice = createSlice({
    name:"user",
    initialState:{
      loginLoading:false,
      loginError:null,
      registerLoading:false,
      regError: null,
      emailDupSuccess: false,

      userInfo: null,
      loading:{
        loginUser:false,
        checkEmailDup:false,
        registerUser:false,
        fetchUserMainInfo:false,
        logoutUser:false,
      },
      success:{
        loginUser:false,
        checkEmailDup:false,
        registerUser:false,
        fetchUserMainInfo:false,
        logoutUser:false,
      },
      error:{
        loginUser: null,
        checkEmailDup: null,
        registerUser: null,
        fetchUserMainInfo: null,
        logoutUser:null,
      },
      userDailyMissions:[],
      userWeeklyMissions:[],
    },
    reducers:{
      clearEmailDupSuccess: (state)=>{
        state.success.checkEmailDup=false;
      },
      clearRegisterUserSuccess: (state)=>{
        state.success.registerUser=false;
      },
      clearUserInfo: (state)=>{
        state.userInfo = null;
      },
      clearLogoutSuccess: (state)=>{
        state.success.logoutUser = null;
      }
    },
    extraReducers: (builder)=>{
      builder
        .addCase(loginUser.pending, (state) => {
            state.loading.loginUser = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading.loginUser = false;
            // const { accessToken, refreshToken, ...userInfo } = action.payload;
            // state.userInfo = userInfo;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading.loginUser = false;
            state.loginError = action.payload;
        })
        .addCase(checkEmailDup.pending,(state)=>{
            state.loading.checkEmailDup=true;
            state.error.checkEmailDup=null;
        })
        .addCase(checkEmailDup.fulfilled, (state,action)=>{
            state.loading.checkEmailDup=false;
            if(action.payload.exists===false){
              state.error.checkEmailDup=null;
              state.success.checkEmailDup=true;
            }else if(action.payload.exists===true){
              state.loading.checkEmailDup=false;
              state.error.checkEmailDup=action.payload.message;
            }
        })        
        .addCase(checkEmailDup.rejected,(state,action)=>{
            state.loading.checkEmailDup=false;            
            state.error.checkEmailDup=action.payload.message;
        })             
        .addCase(registerUser.pending,(state)=>{
            state.loading.registerUser=true;
            state.error.registerUser=null;
        })
        .addCase(registerUser.fulfilled, (state)=>{
            state.loading.registerUser=false;
            state.error.registerUser=null;
            state.success.registerUser=true;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading.registerUser=false;            
            state.error.registerUser=action.payload.message;
        })   
        .addCase(fetchUserMainInfo.pending, (state) => {
          state.loading.fetchUserMainInfo = true;
        })
        .addCase(fetchUserMainInfo.fulfilled, (state, action) => {
          state.loading.fetchUserMainInfo = false;
          const { userInfo, dailyMissions, weeklyMissions } = action.payload;
          state.userInfo = userInfo;
          state.userDailyMissions = dailyMissions || [];
          state.userWeeklyMissions = weeklyMissions || [];
        })
        .addCase(fetchUserMainInfo.rejected, (state, action) => {
          state.loading.fetchUserMainInfo = false;
          state.error.fetchUserMainInfo = action.payload;
        })
        .addCase(logoutUser.pending,(state)=>{
          state.loading.logoutUser=true;
          state.error.logoutUser=null;
        })
        .addCase(logoutUser.fulfilled, (state)=>{
          state.loading.logoutUser=false;
          state.error.logoutUser=null;
          state.success.logoutUser=true;
        })
        .addCase(logoutUser.rejected,(state,action)=>{
          state.loading.logoutUser=false;            
          state.error.logoutUser=action.payload.message;
        })   
    },
})

export const {clearEmailDupSuccess,clearRegisterUserSuccess, clearUserInfo, clearLogoutSuccess} = userSlice.actions;
export default userSlice.reducer;