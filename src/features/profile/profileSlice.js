import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    tenantId: null,
};

const profileSlice = createSlice({
    name: "profile",

    initialState,

    reducers: {
        setProfile: (state, action) => {
            const profile = action.payload;

            state.profile = profile;

            state.tenantId =
                profile?.tenantId ?? null;
        },

        clearProfile: (state) => {
            state.profile = null;
            state.tenantId = null;
        },
    },
});

export const {
    setProfile,
    clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;