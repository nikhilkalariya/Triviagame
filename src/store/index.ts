// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import triviaReducer from './triviaSlice';

const store = configureStore({
    reducer: {
        trivia: triviaReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
