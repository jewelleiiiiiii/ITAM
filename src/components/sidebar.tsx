import SidebarItem from "./sidebarItems";
import { links } from "./sidebarLinks";

function Sidebar() {
  return (
    <div className="w-20 h-screen bg-[#233345] flex flex-col items-center">
      {links.map((link) => (
        <SidebarItem key={link.path} icon={link.icon} path={link.path} label={link.label} sublinks={link.sublinks} />
      ))}
    </div>
  );
}

export default Sidebar;
