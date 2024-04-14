import { API } from "@/services/request-http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    holdingInfo : {} | null ,
    errorMsg:string,
    darkMode: boolean
}

const initialState: InitialState = {
    holdingInfo : {} ,
    errorMsg:'',
    darkMode: typeof window !== 'undefined' && localStorage.getItem('themeMode') ? (localStorage.getItem('themeMode') === 'dark' ? true : false) : false
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
    reducers:{
        darkModeToggle(state,action) {
            state.darkMode = action.payload || !(state.darkMode)
          },
    }
})
export const { darkModeToggle } = holdingSlice.actions
export default holdingSlice.reducer;
