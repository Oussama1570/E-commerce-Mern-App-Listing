// sidebar.jsx
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  { id: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard /> },
  { id: "products", label: "Products", path: "/admin/products", icon: <ShoppingBasket /> },
  { id: "orders", label: "Orders", path: "/admin/orders", icon: <BadgeCheck /> },
];

function AdminSideBar({ open, setOpen }) { // Accepts props
  const navigate = useNavigate();

  return (
    <aside className={`w-64 min-h-screen bg-gray-100 p-4 shadow-md transition-transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      <div onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-2 cursor-pointer p-4">
        <ChartNoAxesCombined size={30} />
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-5">
        {adminSidebarMenuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 rounded-md"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSideBar;
