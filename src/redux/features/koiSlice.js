import { createSlice } from "@reduxjs/toolkit";

const koiSlice =createSlice({
    name:"koi",
    initialState:null,
    reducers:{
        storeKoi:(state,action)=>{
            state=action.payload;
            return state;
        }
    }
})