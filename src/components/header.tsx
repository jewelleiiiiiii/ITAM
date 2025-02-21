import logo from "../assets/logo.png";
import { Bell } from "lucide-react";

function Header() {
  return (
    <div className="w-full bg-white flex flex-row items-center justify-between gap-4 p-4">
      <img src={logo} className="h-13" />
      <h3 className="mr-auto">IT Asset Management</h3>
      <Bell className="" />
    </div>
  );
}

export default Header;
