import { HousePlug, Menu, User, ShoppingCart, UserCog } from "lucide-react"; // Main icons
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "../../components/ui/dropdown-menu.jsx";


function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          className="text-sm font-medium"
          key={menuItem.id}
          to={menuItem.path}
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const user = useSelector((state) => state.auth.user); // Access user from auth state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    navigate('/shop/home'); // Redirect after logout, adjust path as needed
  }

  if (!isAuthenticated) {
    return null; // or a login/signup component
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName?.[0]?.toUpperCase() || "U"} {/* Handle undefined user */}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/shop/account')}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> {/* Corrected class name */}
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <div className="lg:hidden">
          <Button variant="outline" size="icon" onClick={() => console.log("Toggle menu")}> {/* Implement menu toggle */}
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle header menu</span>
          </Button>
        </div>
        <div className="hidden lg:block">
          <MenuItems />
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;