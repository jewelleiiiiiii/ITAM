import {
  ClipboardCheck,
  LayoutDashboard,
  Package,
  UserRound,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function Sidebar() {
  return (
    <div className="w-20 h-screen bg-[#233345] flex flex-col items-center">
      <Link to="/" className="flex flex-col items-center">
        <LayoutDashboard
          size={30}
          color="#ffffff"
          className="mt-5"
          strokeWidth={1.5}
        />
        <p className="text-white text-xs font-light">Dashboard</p>
      </Link>
      <HoverCard>
        <HoverCardTrigger>
          <Link to="/Internal" className="flex flex-col items-center">
            <ClipboardCheck
              size={30}
              color="#ffffff"
              className="mt-8"
              strokeWidth={1.5}
            />
            <p className="text-white text-xs font-light">Assets</p>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent>
          <Link to="/Internal" className="flex flex-col items-center">
            <p className="hover:bg-gray-200 px-2 py-1 rounded">Internal</p>
          </Link>
          <Link to="/External" className="flex flex-col items-center">
            <p className="hover:bg-gray-200 px-2 py-1 rounded">External</p>{" "}
          </Link>
        </HoverCardContent>
      </HoverCard>
      <Link to="/Borrowed" className="flex flex-col items-center">
        <Package size={30} color="#ffffff" className="mt-8" strokeWidth={1.5} />
        <p className="text-white text-xs font-light">Borrowed</p>
      </Link>
      <Link to="/Repair" className="flex flex-col items-center">
        <Wrench size={30} color="#ffffff" className="mt-8" strokeWidth={1.5} />
        <p className="text-white text-xs font-light">Repair</p>
      </Link>
      <Link to="/Issuance" className="flex flex-col items-center">
        <div className="w-20 flex flex-row justify-center mt-8">
          <UserRound size={32} color="#ffffff" strokeWidth={1.5} />
          <Package
            size={18}
            color="#ffffff"
            strokeWidth={1.5}
            className="ml-0 pl-0"
          />
        </div>
        <p className="text-white text-xs font-light">Issuance</p>
      </Link>
    </div>
  );
}

export default Sidebar;
