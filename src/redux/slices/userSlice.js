import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        loading:false,
    },
    reducers:{

    },
    extraReducers: (builder)=>{

    },
})

export const {} = userSlice.actions;
export default userSlice.reducer;