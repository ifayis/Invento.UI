export const selectCompany = (state) =>
    state.company.company;

export const selectCompanyName = (state) =>
    state.company.company?.companyName ?? "";

export const selectCompanyEmail = (state) =>
    state.company.company?.email ?? "";

export const selectCompanyPhoneNumber = (state) =>
    state.company.company?.phoneNumber ?? "";

export const selectCompanyAddress = (state) =>
    state.company.company?.address ?? "";

export const selectCompanyLogoUrl = (state) =>
    state.company.company?.logoUrl ?? "";

export const selectCompanyTaxNumber = (state) =>
    state.company.company?.taxNumber ?? "";

export const selectCompanyWebsite = (state) =>
    state.company.company?.website ?? "";