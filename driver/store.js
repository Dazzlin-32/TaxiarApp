import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice';
import  tripSlice  from './slices/tripSlice';

const store = configureStore({
    reducer: {
        nav: navReducer,
        trip: tripSlice, 
      
    },
});


export default store;