import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKey from '../../constants/storage-key';

export const register = createAsyncThunk(
    'users/register',
    async(payload) =>{
        // call api register
        const data = await userApi.register(payload);

        //save data to local storage
        localStorage.setItem(StorageKey.TOKEN, data.jwt)
        localStorage.setItem(StorageKey.USER, JSON.stringify(data.user))

        //return user data
        return data.user;
    }
);

export const login = createAsyncThunk(
    'users/login',
    async(payload) =>{
        // call api register
        const data = await userApi.login(payload);

        //save data to local storage
        localStorage.setItem(StorageKey.TOKEN, data.jwt)
        localStorage.setItem(StorageKey.USER, JSON.stringify(data.user))

        //return user data
        return data.user;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState:{
        current:JSON.parse(localStorage.getItem(StorageKey.USER)) || {},
        setting: {},
    },
    reducer: {},
    extraReducers: (builder)=> {
        builder.addCase(register.fulfilled, (state, action)=>{
            state.current = action.payload;
        });
        builder.addCase(login.fulfilled, (state, action)=>{
            state.current = action.payload;
        });
    }
});

const {reducer} = userSlice;
export default reducer;