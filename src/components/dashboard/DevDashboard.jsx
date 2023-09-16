import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAssets } from '../../services';

const initialState = {
    name: '',
    quantity: '',
    cost: '',
};

const AssetCreation = () => {
    const dispatch = useDispatch();
    const [asset, setAsset] = useState(initialState);
    const [inputErrors, setInputErrors] = useState({
        name: false,
        quantity: false,
        cost: false,
    });

    const cb = (isCreated) => (isCreated ? setAsset(initialState) : null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAsset({ ...asset, [name]: value });
        setInputErrors({ ...inputErrors, [name]: false });
    };

    const handleAssetCreation = async () => {
        const { name, quantity, cost } = asset;

        const errors = {};
        if (!name) errors.name = true;
        if (!quantity) errors.quantity = true;
        if (!cost) errors.cost = true;

        if (Object.keys(errors).length > 0) {
            setInputErrors(errors);
            return;
        }

        const assetData = { name, quantity, cost };
        dispatch(addAssets(assetData, cb));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Asset Creation</h2>
                <div className={`mb-4 ${inputErrors.name ? 'border-red-500' : ''}`}>
                    <label htmlFor="name" className="block text-gray-600 mb-2">
                        Asset Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={asset.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${
                            inputErrors.name ? 'border-red-500' : 'focus:border-blue-400'
                        }`}
                    />
                </div>
                <div className={`mb-4 ${inputErrors.quantity ? 'border-red-500' : ''}`}>
                    <label htmlFor="quantity" className="block text-gray-600 mb-2">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={asset.quantity}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${
                            inputErrors.quantity ? 'border-red-500' : 'focus:border-blue-400'
                        }`}
                    />
                </div>
                <div className={`mb-4 ${inputErrors.cost ? 'border-red-500' : ''}`}>
                    <label htmlFor="cost" className="block text-gray-600 mb-2">
                        Cost
                    </label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={asset.cost}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded shadow focus:outline-none ${
                            inputErrors.cost ? 'border-red-500' : 'focus:border-blue-400'
                        }`}
                    />
                </div>
                <button
                    onClick={handleAssetCreation}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Create Asset
                </button>
            </div>
        </div>
    );
};

export default AssetCreation;
