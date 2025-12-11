import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import OnboardingRouter from './pages/onboarding/OnboardingRouter';

function App() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { isComplete } = useAppSelector((state) => state.onboarding);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            isComplete ? (
                                <Navigate to="/home" replace />
                            ) : (
                                <Navigate to="/onboarding" replace />
                            )
                        ) : (
                            <Login />
                        )
                    }
                />

                <Route
                    path="/onboarding/*"
                    element={
                        <ProtectedRoute requireAuth={true}>
                            <OnboardingRouter />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute requireAuth={true} requireOnboardingComplete={true}>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            isComplete ? (
                                <Navigate to="/home" replace />
                            ) : (
                                <Navigate to="/onboarding" replace />
                            )
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
