import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setCurrentStep } from '../store/slices/onboardingSlice';
import { TOTAL_ONBOARDING_STEPS } from '../utils/constants';
import StepIndicator from './StepIndicator';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    onNext?: () => void;
    onBack?: () => void;
    showBack?: boolean;
    nextLabel?: string;
    renderButtons?: (handleBack: () => void) => React.ReactNode;
}

const OnboardingLayout = ({
    children,
    onNext,
    onBack,
    showBack = true,
    nextLabel = 'Next',
    renderButtons,
}: OnboardingLayoutProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentStep = useAppSelector((state) => state.onboarding.currentStep);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (currentStep > 1) {
            dispatch(setCurrentStep(currentStep - 1));
            navigate(`/onboarding/step${currentStep - 1}`);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
                <div className="relative px-4 py-10 bg-base-100 shadow-xl rounded-2xl sm:rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_ONBOARDING_STEPS} />

                        <div className="mt-8">
                            {children}
                        </div>

                        {renderButtons ? (
                            <div className="mt-8">
                                {renderButtons(handleBack)}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between mt-8 pt-4 border-t border-base-200">
                                {showBack && currentStep > 1 ? (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="btn btn-outline"
                                    >
                                        Back
                                    </button>
                                ) : (
                                    <div />
                                )}

                                <button
                                    type="button"
                                    onClick={onNext}
                                    className="btn btn-primary"
                                >
                                    {nextLabel}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingLayout;
