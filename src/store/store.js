import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/Auth/userSlice';
import recentReducer from './recentSlice'
const rootReducer = {
    user : userReducer,
    recent : recentReducer,

}

const store = configureStore({
    reducer : rootReducer,
        
})


export default store;