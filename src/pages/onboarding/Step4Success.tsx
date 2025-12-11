import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { completeOnboarding } from '../../store/slices/onboardingSlice';

const Step4Success = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(completeOnboarding());
    }, [dispatch]);

    const handleContinue = () => {
        navigate('/home');
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="radial-progress bg-success text-success-content border-4 border-success" style={{ "--value": "100" } as React.CSSProperties}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold">Success!</h1>
                    <p className="py-6">
                        Your onboarding is complete. Welcome aboard! You're all set to start using the application.
                    </p>

                    <button
                        onClick={handleContinue}
                        className="btn btn-primary btn-lg"
                    >
                        Continue to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step4Success;
