import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducers from './rootReducer';

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
