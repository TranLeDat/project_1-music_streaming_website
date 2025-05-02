import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const register = createAsyncThunk(
    'users/register',
    async(payload) =>{
        // call api register
        const data = await userApi.register(payload);

        //save data to local storage
        localStorage.setItem('access_token', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))

        //return user data
        return data.user;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState:{
        current: {},
        setting: {},
    },
    reducer: {},
    extraReducers: {
        // 'user/register/fulfilled'
        [register.fulfilled] : (state, action) =>{
            state.current = action.payload;
        }
    }
});

const {reducer} = userSlice;
export default reducer;