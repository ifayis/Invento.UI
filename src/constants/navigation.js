import {
    LayoutDashboard,
    Boxes,
    Package,
    Users,
    Truck,
    ShoppingCart,
    Receipt,
    Wallet,
    BarChart3,
    Building2,
    Settings,
} from "lucide-react";

export const navigation = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Categories",
        path: "/categories",
        icon: Boxes,
    },
    {
        title: "Products",
        path: "/products",
        icon: Package,
    },
    {
        title: "Customers",
        path: "/customers",
        icon: Users,
    },
    {
        title: "Suppliers",
        path: "/suppliers",
        icon: Truck,
    },
    {
        title: "Purchases",
        path: "/purchases",
        icon: ShoppingCart,
    },
    {
        title: "Sales",
        path: "/sales",
        icon: Receipt,
    },
    {
        title: "Balance",
        path: "/balance",
        icon: Wallet,
    },
    {
        title: "Reports",
        path: "/reports",
        icon: BarChart3,
    },
    {
        title: "Company",
        path: "/company",
        icon: Building2,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: Settings,
    },
];