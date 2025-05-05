import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/Auth/userSlice';
import recentReducer from './recentSlice'
import playReducer from './playSlice'

const rootReducer = {
    user : userReducer,
    recent : recentReducer,
    play: playReducer,

}

const store = configureStore({
    reducer : rootReducer,
        
})


export default store;