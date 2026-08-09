export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: "/api/v1/Auth/register",
        LOGIN: "/api/v1/Auth/login",
        REFRESH_TOKEN: "/api/v1/Auth/refresh-token",
        LOGOUT: "/api/v1/Auth/logout",
        FORGOT_PASSWORD: "/api/v1/Auth/forgot-password",
        RESET_PASSWORD: "/api/v1/Auth/reset-password",
        CHANGE_PASSWORD: "/api/v1/Auth/change-password",
    },

    PROFILE: {
        ROOT: "/api/v1/Profile",
    },

    COMPANY: {
        ROOT: "/api/v1/Company",
    },

    DASHBOARD: {
        SUMMARY: "/api/v1/Dashboard/summary",
        RECENT_SALES: "/api/v1/Dashboard/recent-sales",
        RECENT_PURCHASES: "/api/v1/Dashboard/recent-purchases",
        TOP_PRODUCTS: "/api/v1/Dashboard/top-products",
        TOP_CUSTOMERS: "/api/v1/Dashboard/top-customers",
        TOP_SUPPLIERS: "/api/v1/Dashboard/top-suppliers",
        MONTHLY_SALES_CHART:
            "/api/v1/Dashboard/monthly-sales-chart",
        MONTHLY_PURCHASES_CHART:
            "/api/v1/Dashboard/monthly-purchases-chart",
        MONTHLY_PROFIT_CHART:
            "/api/v1/Dashboard/monthly-profit-chart",
        SALES_TREND:
            "/api/v1/Dashboard/sales-trend",
        CASHFLOW_TREND:
            "/api/v1/Dashboard/cashflow-trend",
        PROFIT_TREND:
            "/api/v1/Dashboard/profit-trend",
        OVERVIEW:
            "/api/v1/Dashboard/overview",
    },

    BALANCE: {
        DASHBOARD: "/api/v1/Balance/dashboard",
        TRANSACTIONS: "/api/v1/Balance/transactions",
        INCOME: "/api/v1/Balance/income",
        EXPENSE: "/api/v1/Balance/expense",
        CASHFLOW: "/api/v1/Balance/cashflow",
    },

    CATEGORIES: {
        ROOT: "/api/v1/Categories",
    },

    CUSTOMERS: {
        ROOT: "/api/v1/Customers",
        TOP_CUSTOMERS:
            "/api/v1/Customers/top-customers",
        INACTIVE:
            "/api/v1/Customers/inactive",
        DASHBOARD:
            "/api/v1/Customers/dashboard",
    },
};