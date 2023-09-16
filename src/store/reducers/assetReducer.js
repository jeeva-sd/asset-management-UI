import { createSlice } from '@reduxjs/toolkit';

const assetSlice = createSlice({
    name: 'assets',
    initialState: {
        list: []
    },
    reducers: {
        setAssets: (state, action) => {
            const { payload } = action;
            state.list = payload;
        },
    },
});

export const { setAssets } = assetSlice.actions;
export default assetSlice.reducer;