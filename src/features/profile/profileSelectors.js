export const selectProfile = (state) =>
    state.profile.profile;

export const selectTenantId = (state) =>
    state.profile.tenantId;

export const selectProfileName = (state) =>
    state.profile.profile?.fullName ?? "";

export const selectProfileEmail = (state) =>
    state.profile.profile?.email ?? "";

export const selectProfileRole = (state) =>
    state.profile.profile?.role ?? null;

export const selectProfileIsActive = (state) =>
    state.profile.profile?.isActive ?? false;

export const selectMustChangePassword = (
    state
) =>
    state.profile.profile
        ?.mustChangePassword ?? false;