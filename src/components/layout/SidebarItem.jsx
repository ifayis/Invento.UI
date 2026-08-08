import { NavLink } from "react-router-dom";

const SidebarItem = ({ item, onClick }) => {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.path}
            onClick={onClick}
            className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-xl px-4 py-3
                transition-all duration-200

                ${
                    isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                }
                `
            }
        >
            <Icon size={20} />

            <span>{item.title}</span>
        </NavLink>
    );
};

export default SidebarItem;