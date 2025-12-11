import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import onboardingReducer from './slices/onboardingSlice';
import { localStorageMiddleware, loadState } from './localStorageMiddleware';

const rootReducer = combineReducers({
    auth: authReducer,
    onboarding: onboardingReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
