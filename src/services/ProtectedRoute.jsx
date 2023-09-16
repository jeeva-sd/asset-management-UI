import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        return () => {
            navigate('/');
        };
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute;