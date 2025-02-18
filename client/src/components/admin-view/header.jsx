import { Button } from "@/components/ui/button"; 
import { LogOut, Menu } from "lucide-react"; // Importing an icon for the menu button
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {

  const dispatch = useDispatch();
  function handleLogout() {

    dispatch(logoutUser());
  }


  return (
    <header className="flex items-center justify-between p-4 border-b">
      {/* Sidebar Toggle Button */}
      <div className="flex items-center">
        <Button variant="ghost" className="lg:hidden" onClick={() => setOpen(prev => !prev)}>
          <Menu size={24} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <span className="text-xl font-bold ml-4">Admin Dashboard</span>
      </div>

      {/* Logout Button */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
