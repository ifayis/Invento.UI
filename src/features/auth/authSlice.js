import { createSlice } from "@reduxjs/toolkit";

import { authStorage } from "@/utils/authStorage";

const initialState = {
    user: null,
    isAuthenticated: authStorage.hasAccessToken(),
    isInitialized: false,
    sessionExpiresAt: null,
    mustChangePassword: false,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setCredentials: (state, action) => {
            const {
                user = null,
                expiresAt = null,
                mustChangePassword = false,
            } = action.payload;

            state.user = user;
            state.isAuthenticated = true;
            state.sessionExpiresAt = expiresAt;
            state.mustChangePassword =
                mustChangePassword;
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },

        setMustChangePassword: (state, action) => {
            state.mustChangePassword =
                action.payload;
        },

        clearCredentials: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.sessionExpiresAt = null;
            state.mustChangePassword = false;
        },

        setInitialized: (state, action) => {
            state.isInitialized = action.payload;
        },
    },
});

export const {
    setCredentials,
    setUser,
    setMustChangePassword,
    clearCredentials,
    setInitialized,
} = authSlice.actions;

export default authSlice.reducer;