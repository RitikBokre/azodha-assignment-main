import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireOnboardingComplete?: boolean;
}

const ProtectedRoute = ({
    children,
    requireAuth = true,
    requireOnboardingComplete = false
}: ProtectedRouteProps) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { isComplete } = useAppSelector((state) => state.onboarding);

    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireOnboardingComplete && !isComplete) {
        return <Navigate to="/onboarding" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
