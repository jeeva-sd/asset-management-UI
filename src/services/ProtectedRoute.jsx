import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) return navigate('/');
        return () => {
            navigate('/');
        };
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Component {...rest} /> : null;
};

export default ProtectedRoute;