import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

// eslint-disable-next-line react/prop-types
const ProtectedRoute  = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute ;