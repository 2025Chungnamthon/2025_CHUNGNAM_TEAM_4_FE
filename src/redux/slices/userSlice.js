import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { saveAccessToken, saveRefreshToken } from "../../utils/tokenStorage";
import { Alert } from "react-native";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/sign-in", { email, password })
      console.log(response.data); 

      const accessToken = response.data.accessToken
      const refreshToken = response.data.refreshToken
      if(accessToken){
        await saveAccessToken(accessToken)
        console.log
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
        return rejectWithValue(error.response.data.message)
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
      },
      success:{
        loginUser:false,
        checkEmailDup:false,
        registerUser:false,
        fetchUserMainInfo:false,
      },
      error:{
        loginUser: null,
        checkEmailDup: null,
        registerUser: null,
        fetchUserMainInfo: null,
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
    },
})

export const {clearEmailDupSuccess,clearRegisterUserSuccess} = userSlice.actions;
export default userSlice.reducer;