import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from '../features/user/userSlice';
import userSlice from '../features/user/userSlice';
import movieReducer from '../features/movie/movieSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userSlice
  },
});
