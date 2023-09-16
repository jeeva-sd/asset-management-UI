import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getAssets, purchaseAssets, sellAsset } from '../../services';
import { toast } from 'react-toastify';
import { logout } from '../../store/reducers/userReducer';

const UserDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const assets = useSelector((state) => state.assets.list);
    const userInfo = useSelector((state) => state.user.userInfo);

    const [selectedPurchaseAsset, setSelectedPurchaseAsset] = useState('');
    const [selectedSellAsset, setSelectedSellAsset] = useState('');
    const [quantityToSell, setQuantityToSell] = useState(1);

    useEffect(() => {
        dispatch(getAssets());
    }, [dispatch]);

    const purchasedAssets = useMemo(() => {
        const { purchasedAssets } = userInfo;

        if (!assets || !Array.isArray(assets) || !purchasedAssets) return [];

        let list = [];

        assets.forEach(asset => {
            const assetId = asset._id;

            if (purchasedAssets.includes(assetId)) {
                const count = purchasedAssets.filter(id => id === assetId).length;
                const { name, cost } = asset;
                list.push({ name, cost, count });
            }
        });

        return list;
    }, [userInfo, assets]);

    const handlePurchase = async () => {
        if (!selectedPurchaseAsset) {
            toast.error('Please select an asset to purchase.');
            return;
        }

        const purchaseData = {
            username: userInfo.username,
            assetName: selectedPurchaseAsset,
            userInfo,
            assets
        };

        dispatch(purchaseAssets(purchaseData));
    };

    const handleSell = async () => {
        if (!selectedSellAsset) {
            toast.error('Please select an asset to sell.');

            return;
        }

        const sellData = {
            username: userInfo.username,
            assetName: selectedSellAsset,
            quantity: quantityToSell,
            userInfo,
            assets
        };

        dispatch(sellAsset(sellData));
    };

    return (
        <div className="min-h-screen bg-gray-200 pt-40">
            <div className="bg-white p-8 rounded shadow-md mx-auto w-96">

                <h2 className="text-2xl font-semibold mb-4">Hi, {userInfo.username}</h2>
                <hr className="my-6 border-gray-300" />

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Purchased Assets:</h3>
                    <div className=" border p-2 rounded-md bg-blue-100 shadow-sm">
                        {purchasedAssets && Array.isArray(purchasedAssets) && purchasedAssets.length > 0 ?
                            purchasedAssets.map((asset) => (
                                <div key={asset._id} >
                                    {asset.name} (Quantity: {asset.count})
                                </div>
                            )) : <div>0</div>}
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="mb-6">
                    <label htmlFor="asset" className="block text-gray-600 mb-2">
                        Select Asset to Purchase (Limit: <span className='text-gray-600 font-semibold'> ${userInfo ? userInfo.bankBalance : null}</span>)
                    </label>
                    <select
                        id="asset"
                        name="asset"
                        value={selectedPurchaseAsset}
                        onChange={(e) => setSelectedPurchaseAsset(e.target.value)}
                        className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:border-blue-400"
                    >
                        <option value="">Select an Asset</option>
                        {assets && assets.length > 0 && assets.map((asset) => (
                            <option key={asset.name} value={asset.name}>
                                {asset.name} (Cost: ${asset.cost}, Remaining: {asset.quantity})
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handlePurchase}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
                >
                    Purchase Asset
                </button>

                <hr className="my-6 border-gray-300" />

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Sell Purchased Assets:</h3>
                    <div className="mb-4">
                        <label htmlFor="sellAsset" className="block text-gray-600 mb-2">
                            Select Asset to Sell
                        </label>
                        <select
                            id="sellAsset"
                            name="sellAsset"
                            value={selectedSellAsset}
                            onChange={(e) => setSelectedSellAsset(e.target.value)}
                            className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:border-blue-400"
                        >
                            <option value="">Select an Asset</option>
                            {purchasedAssets &&
                                purchasedAssets.map((asset) => (
                                    <option key={asset._id} value={asset.name}>
                                        {asset.name} (Quantity: {asset.count})
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantityToSell" className="block text-gray-600 mb-2">
                            Quantity to Sell
                        </label>
                        <input
                            type="number"
                            id="quantityToSell"
                            name="quantityToSell"
                            value={quantityToSell}
                            onChange={(e) => setQuantityToSell(e.target.value)}
                            className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <button
                        onClick={handleSell}
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                        Sell Asset
                    </button>

                    <hr className="my-6 border-gray-300" />

                    <button
                        onClick={() => {
                            dispatch(logout());
                            navigate('/');
                        }}
                        className="w-full mt-2 border text-red-500 border-red-500 hover:text-white py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
