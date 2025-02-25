import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface SidebarItemProps {
  icon?: any;
  label: string;
  path: string;
  sublinks?: SidebarItemProps[];
}

function SidebarItem({ icon: Icon, label, path, sublinks }: SidebarItemProps) {
  return (
    <>
      {sublinks ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Link to={path} className="flex flex-col items-center">
              <Icon size={30} color="#ffffff" strokeWidth={1.5} className="mt-8" />
              <p className="text-white text-xs font-light">{label}</p>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent>
            {sublinks.map((sub) => (
              <Link
                key={sub.path}
                to={sub.path}
                className="flex flex-col items-center"
              >
                <p className="hover:bg-gray-200 px-2 py-1 rounded">
                  {sub.label}
                </p>
              </Link>
            ))}
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Link to={path} className="flex flex-col items-center">
          <Icon size={30} color="#ffffff" strokeWidth={1.5} className="mt-8" />
          <p className="text-white text-xs font-light">{label}</p>
        </Link>
      )}
    </>
  );
}

export default SidebarItem;
