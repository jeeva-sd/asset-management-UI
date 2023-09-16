import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [inputErrors, setInputErrors] = useState({
        username: false,
        password: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        setInputErrors({ ...inputErrors, [name]: false });
    };

    const cb = (registered) => (registered ? navigate('/dashboard') : null);

    const handleLogin = () => {
        const { username, password } = credentials;

        const errors = {};
        if (!username) errors.username = true;
        if (!password) errors.password = true;

        if (Object.keys(errors).length > 0) {
            setInputErrors(errors);
            return;
        }

        dispatch(loginUser(credentials, cb));
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <div className={`mb-4 ${inputErrors.username ? 'border-red-500' : ''}`}>
                    <label htmlFor="username" className="block text-gray-600 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${inputErrors.username ? 'border-red-500' : 'focus:border-blue-400'}`}
                    />
                </div>
                <div className={`mb-4 ${inputErrors.password ? 'border-red-500' : ''}`}>
                    <label htmlFor="password" className="block text-gray-600 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${inputErrors.password ? 'border-red-500' : 'focus:border-blue-400'}`}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
                <button
                    onClick={handleRegister}
                    className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Login;