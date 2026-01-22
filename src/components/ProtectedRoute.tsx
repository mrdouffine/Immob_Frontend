import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireHost?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAuth = true,
    requireHost = false,
}) => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (requireAuth && !isAuthenticated) {
        // Rediriger vers login en sauvegardant la page d'origine
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireHost && user?.role !== 'host' && user?.role !== 'admin') {
        // Rediriger vers l'accueil si pas hôte
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
