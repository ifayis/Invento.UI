export const selectAuth = (state) =>
    state.auth;

export const selectCurrentUser = (state) =>
    state.auth.user;

export const selectIsAuthenticated = (state) =>
    state.auth.isAuthenticated;

export const selectAuthInitialized = (state) =>
    state.auth.isInitialized;

export const selectSessionExpiresAt = (state) =>
    state.auth.sessionExpiresAt;

export const selectMustChangePassword = (state) =>
    state.auth.mustChangePassword;