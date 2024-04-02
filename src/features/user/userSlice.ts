import { API } from "@/services/request-http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface InitialState {
    userInfo : {} | null ,
    loading: boolean,
    errorMsg:string,
    apiCode: string | number
}

const initialState: InitialState = {
    userInfo : {} ,
    loading : false,
    errorMsg:'',
    apiCode: ''
}

export const fetchUserInfo = createAsyncThunk('user/fetchUser', async(id:any,{rejectWithValue,fulfillWithValue}) => {
        let headers = {
        'SM-TOKEN': JSON.parse(localStorage.getItem('token') || ''),
        'X-VIEWNAME': 'simple',
      };
    try{
        const res = await API(`preauth/bills/customer/${id}/getCustomerProfile`, "get",{},headers)
        return  fulfillWithValue(res.data)
    } catch (err:any) {
       return rejectWithValue(err.response)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers:
     builder => {
        builder.addCase(fetchUserInfo.pending,(state) => {
            state.loading = true
            })
    builder.addCase(fetchUserInfo.fulfilled,(state,action:any) => {
    state.userInfo = action.payload.result || null
    state.loading = false
    })
    builder.addCase(fetchUserInfo.rejected,(state,action:any) => {
        state.errorMsg = action.payload?.data.message
        state.loading = false
        state.apiCode = action.payload?.status
        })
    }
    ,
    reducers:{}
})

export default userSlice.reducer;
