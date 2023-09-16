import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: [],
    },
    reducers: {
        setRequesting: (state, action) => {
            const { payload } = action;
            state.isRequesting = payload;
        },
        setUserInfo: (state, action) => {
            const { payload } = action;

            state.userInfo = payload;
            state.isRequesting = false;
            state.isDev = payload.isDev;
            state.isAuthenticated = payload.isAuthenticated;

            localStorage.setItem('userInfo', JSON.stringify({ ...payload, isAuthenticated: state.isAuthenticated, isDev: state.isDev }));
        },
        updateInfo: (state, action) => {
            const { payload } = action;
            console.log(payload, 'user');
            state.userInfo = { ...payload };
        },
    },
});

export const { setRequesting, setUserInfo, updateInfo } = userSlice.actions;
export default userSlice.reducer;