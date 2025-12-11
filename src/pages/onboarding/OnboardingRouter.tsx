import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Step1PersonalProfile from './Step1PersonalProfile';
import Step2FavoriteSongs from './Step2FavoriteSongs';
import Step3Payment from './Step3Payment';
import Step4Success from './Step4Success';

const OnboardingRouter = () => {
    const navigate = useNavigate();
    const { currentStep, isComplete } = useAppSelector((state) => state.onboarding);

    useEffect(() => {
        if (isComplete) {
            navigate('/home', { replace: true });
        } else {
            navigate(`/onboarding/step${currentStep}`, { replace: true });
        }
    }, [isComplete, navigate, currentStep]);

    return (
        <Routes>
            <Route path="step1" element={<Step1PersonalProfile />} />
            <Route path="step2" element={<Step2FavoriteSongs />} />
            <Route path="step3" element={<Step3Payment />} />
            <Route path="step4" element={<Step4Success />} />
        </Routes>
    );
};

export default OnboardingRouter;
