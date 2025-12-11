export interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
}

export interface PersonalInfo {
    name: string;
    age: string;
    email: string;
    profilePicture: string;
}

export interface PaymentInfo {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface OnboardingState {
    currentStep: number;
    isComplete: boolean;
    personalInfo: PersonalInfo;
    favoriteSongs: string[];
    paymentInfo: PaymentInfo;
}

export interface RootState {
    auth: AuthState;
    onboarding: OnboardingState;
}
