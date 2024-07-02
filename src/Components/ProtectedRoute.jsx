import { useAuthStore } from '../Data/AuthStore';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated()) {
        return <Navigate to='/login' />;
    }

    return element;
};


