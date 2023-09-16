import { http } from "../extensions";
import { setAssets } from '../store/reducers/assetReducer';
import { setUserInfo, updateInfo } from '../store/reducers/userReducer';
import { toast } from 'react-toastify';

export const registerUser = (payload, cb) => async () => {
    try {
        const { data } = await http.post(`/user/register`, payload);

        console.log(data, 'data');

        if (data.message === 'User registered successfully') {
            cb(true);
            console.log('Registration successful');
        } else {
            cb(false);
            console.log('Registration failed');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};


export const loginUser = (payload, cb) => async (dispatch) => {
    try {
        const { data } = await http.post(`/user/login`, payload);

        if (data.token) {

            const userInfo = {
                username: payload.username,
                isDev: data.isDev,
                isAuthenticated: data.isAuthenticated,
                userId: data.userId,
                token: data.token,
                purchasedAssets: data.purchasedAssets,
                bankBalance: data.bankBalance,
            };

            dispatch(setUserInfo(userInfo));

            http.setAuthToken(data.token);
            console.log('Login successful');
            cb(true);
        } else {
            cb(false);
            console.log('Login failed');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export const getAssets = () => async (dispatch) => {
    try {
        const { data } = await http.get(`/asset`);
        dispatch(setAssets(data));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};


export const addAssets = (payload, cb) => async (dispatch) => {
    try {
        const { data } = await http.post(`/asset`, payload);

        if (data.message === 'Asset created successfully') {
            dispatch(setAssets(data));
            cb(true);
            console.log('Registration successful');
        } else {
            cb(false);
            console.log('Registration failed');
        }

        // dispatch(setMovies(data));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export const purchaseAssets = (payload) => async (dispatch) => {
    try {
        const { data } = await http.post(`/purchase`, payload);
        const { userInfo, assets } = payload;

        const selectedAsset = assets.filter(asset => asset.name === payload.assetName);

        const updatedAssets = assets.map(e => {
            if (e.name === payload.assetName) {
                return { ...e, quantity: e.quantity - 1 };
            }
            else return e;
        });

        let updatedUserInfo = { ...userInfo, bankBalance: userInfo.bankBalance - selectedAsset[0].cost, purchasedAssets: [...userInfo.purchasedAssets, selectedAsset[0]._id] };

        if (data.message === 'Asset purchased successfully') {
            dispatch(updateInfo(updatedUserInfo));
            dispatch(setAssets(updatedAssets));
        } else {
            toast(data.error);
            console.log('Registration failed');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export const sellAsset = (payload, cb) => async (dispatch) => {
    try {
        const { data } = await http.delete(`/purchase`, payload);
        const { userInfo, assets, } = payload;

        const purchasedId = assets[0]._id;
        const purchaseCost = assets[0].cost;

        const updatedAssets = assets.map(e => {
            if (e.name === payload.assetName) {
                return { ...e, quantity: e.quantity + 1 };
            }
            else return e;
        });

        let countToRemove = payload.quantity;

        const updatedPurchasedAssets = payload.quantity > 0 ? userInfo.purchasedAssets.filter(item => {
            if (item === purchasedId && countToRemove > 0) {
                countToRemove--;
                return false;
            }
            return true;
        }) : userInfo.purchasedAssets;

        let updatedUserInfo = {
            ...userInfo,
            bankBalance: userInfo.bankBalance + (purchaseCost * payload.quantity),
            purchasedAssets: updatedPurchasedAssets
        };


        if (data.message === 'Asset sold successfully') {
            dispatch(setAssets(updatedAssets));
            dispatch(updateInfo(updatedUserInfo));
            cb(true);

            // if(assetName)
        } else {
            cb(false);
            toast(data.error);
            console.log('Registration failed');
        }

        // dispatch(setMovies(data));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};