import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './types';

const STORAGE_KEY = 'onboarding_app_state';

export function loadState(): Partial<RootState> | undefined {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as Partial<RootState>;
    } catch {
        return undefined;
    }
}

function saveState(state: RootState): void {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (err) {
        console.error('Error saving state to localStorage:', err);
    }
}

export const localStorageMiddleware: Middleware<unknown, RootState> = (store) => (next) => (action) => {
    const result = next(action);
    saveState(store.getState() as RootState);
    return result;
};
