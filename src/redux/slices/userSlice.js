import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { saveAccessToken, saveRefreshToken } from "../../utils/tokenStorage";

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
      return rejectWithValue(error.message);
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
        console.log(response.data.message)

        return response.data;
      }catch(error){
        console.log("error: ",error.response.data.message);
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


const userSlice = createSlice({
    name:"user",
    initialState:{
        loginLoading:false,
        loginError:null,
        registerLoading:false,
        regError: null,
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending, (state) => {
            state.loginLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loginLoading = false;
            // state.user = action.payload.user_id;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loginLoading = false;
            state.loginError = action.payload;
        })
        .addCase(registerUser.pending,(state)=>{
            state.registerLoading=true;
            state.regError=null;
        })
        .addCase(registerUser.fulfilled, (state)=>{
            state.registerLoading=false;
            state.regError=null;
            state.regSuccess=true;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.registerLoading=false;            
            state.regError=action.payload.message;
        })
    },
})

export const {} = userSlice.actions;
export default userSlice.reducer;