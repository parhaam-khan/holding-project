import { API } from "@/services/request-http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    holdingInfo : {} | null ,
    errorMsg:string
}

const initialState: InitialState = {
    holdingInfo : {} ,
    errorMsg:''
}

export const fetchHoldingInfo = createAsyncThunk('holding/fetchHolding',async (id:any,{rejectWithValue,fulfillWithValue}) => {
try{
    const res:any = await API(`${id}/holding`, "get")
    return  fulfillWithValue(res.data)
} catch (err:any) {
   return rejectWithValue(err.response)
}
})

export const holdingSlice = createSlice({
    name: 'holding',
    initialState,
    extraReducers:
     builder => {
    builder.addCase(fetchHoldingInfo.fulfilled,(state,action) => {
    state.holdingInfo = action.payload.result || null
    })
    builder.addCase(fetchHoldingInfo.rejected,(state,action:any) => {
        state.errorMsg = action.payload?.data.message || ''
        state.holdingInfo = {}
        })
    }
    ,
    reducers:{}
})

export default holdingSlice.reducer;
