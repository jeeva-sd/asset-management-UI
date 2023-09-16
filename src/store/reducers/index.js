import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import assetReducer from './assetReducer';

const rootReducer = combineReducers({
    user: userReducer,
    assets: assetReducer
});

export default rootReducer;