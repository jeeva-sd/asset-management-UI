import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services';
import { useNavigate } from 'react-router';

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        age: '',
        gender: '',
        dob: '',
        password: ''
    });
    const [inputErrors, setInputErrors] = useState({
        name: false,
        age: false,
        gender: false,
        dob: false,
        password: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setInputErrors({ ...inputErrors, [name]: false });
    };

    const cb = (registered) => (registered ? navigate('/') : null);

    const handleRegistration = async () => {
        const { name, age, gender, dob, password } = user;

        const errors = {};
        if (!name) errors.name = true;
        if (!age) errors.age = true;
        if (!gender) errors.gender = true;
        if (!dob) errors.dob = true;
        if (!password) errors.password = true;

        if (Object.keys(errors).length > 0) {
            setInputErrors(errors);
            return;
        }

        const registrationData = { name, age, gender, dob, password };
        dispatch(registerUser(registrationData, cb));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Registration</h2>
                <div className={`mb-4 ${inputErrors.name ? 'border-red-500' : ''}`}>
                    <label htmlFor="name" className="block text-gray-600 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${inputErrors.name ? 'border-red-500' : 'focus:border-blue-400'
                            }`}
                    />
                </div>
                <div className={`mb-4 ${inputErrors.name ? 'border-red-500' : ''}`}>
                    <label htmlFor="name" className="block text-gray-600 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${inputErrors.password ? 'border-red-500' : 'focus:border-blue-400'
                            }`}
                    />
                </div>
                <div className={`mb-4 ${inputErrors.age ? 'border-red-500' : ''}`}>
                    <label htmlFor="age" className="block text-gray-600 mb-2">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={user.age}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${inputErrors.age ? 'border-red-500' : 'focus:border-blue-400'
                            }`}
                    />
                </div>
                <div className={`mb-4 ${inputErrors.gender ? 'border-red-500' : ''}`}>
                    <label htmlFor="gender" className="block text-gray-600 mb-2">
                        Gender
                    </label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={user.gender}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${inputErrors.gender ? 'border-red-500' : 'focus:border-blue-400'
                            }`}
                    />
                </div>
                <div className={`mb-4 ${inputErrors.dob ? 'border-red-500' : ''}`}>
                    <label htmlFor="dob" className="block text-gray-600 mb-2">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={user.dob}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${inputErrors.dob ? 'border-red-500' : 'focus:border-blue-400'
                            }`}
                    />
                </div>
                <button
                    onClick={handleRegistration}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Registration;
