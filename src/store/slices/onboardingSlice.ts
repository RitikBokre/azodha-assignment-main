
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OnboardingState, PersonalInfo, PaymentInfo } from '../types';

const initialState: OnboardingState = {
    currentStep: 1,
    isComplete: false,
    personalInfo: {
        name: '',
        age: '',
        email: '',
        profilePicture: '',
    },
    favoriteSongs: [],
    paymentInfo: {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    },
};

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
        setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
            state.personalInfo = action.payload;
        },
        setFavoriteSongs: (state, action: PayloadAction<string[]>) => {
            state.favoriteSongs = action.payload;
        },
        setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
            state.paymentInfo = action.payload;
        },
        completeOnboarding: (state) => {
            state.isComplete = true;
        },
        resetOnboarding: () => {
            return initialState;
        },
    },
});

export const {
    setCurrentStep,
    setPersonalInfo,
    setFavoriteSongs,
    setPaymentInfo,
    completeOnboarding,
    resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
