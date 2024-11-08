import { useAuth } from "@/context/AuthContext";
import {
  ChevronLeft,
  CookingPotIcon,
  LandPlot,
  LayoutDashboard,
  Truck,
  UserCheck2Icon,
  UserIcon,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../public/ecosync-logo.png";
import { AccountMenu } from "./UserAccountMenu";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();
  const Menus = [
    {
      title: "Dashboard",
      src: <LayoutDashboard />,
      path: "",
      roles: ["System Admin", "STS Manager", "Landfill Manager"],
    },
    {
      title: "Manage Users",
      src: <Users />,
      path: "/users",
      roles: ["System Admin"],
    },
    {
      title: "Manage Vehicles",
      src: <Truck />,
      path: "/vehicles",
      roles: ["System Admin"],
    },
    {
      title: "Manage STS",
      src: <CookingPotIcon />,
      path: "/sts",
      roles: ["System Admin", "STS Manager"],
    },
    {
      title: "Manage Landfill",
      src: <LandPlot />,
      path: "/landfill",
      roles: ["System Admin", "Landfill Manager"],
    },
    {
      title: "Roles & Permissions",
      src: <UserCheck2Icon />,
      path: "/roles-and-permission",
      roles: ["System Admin"],
    },
    // { title: "Accounts", src: "User", gap: true },
  ];

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20"
      } bg-dark-purple h-screen border-2 border-r-gray-100 p-5 pt-8 relative ease-in-out duration-300 bg-[#F8F9FA] flex flex-col justify-between`}
    >
      <div>
        {/* expand icon */}
        <button
          className={`absolute cursor-pointer -right-4 top-11 w-7 border-dark-purple
              border-2 rounded-full
           ${!open && "rotate-180 top-[38px] -right-"}`}
          onClick={() => setOpen(!open)}
        >
          <ChevronLeft width={24} />
        </button>

        {/* top logo */}
        <div className="flex gap-x-4 items-center">
          {/* Logo */}
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            width={50}
          />
          {/* brand name */}
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            EcoSync
          </h1>
        </div>

        {/* nav items */}
        <ul className="pt-6">
          {Menus.map(
            (Menu, index) =>
              Menu.roles.includes(user?.role.role_name) && (
                <NavLink
                  to={`/dashboard${Menu.path}`}
                  style={({ isActive }) => ({
                    color: isActive ? "white" : "#787E8B",
                    backgroundColor: isActive ? "#17A948" : "#F8F9FA",
                    fontWeight: isActive ? "bold" : "",
                  })}
                  end
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-slate-200 text-[#4E71A4] text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                  {Menu.src}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </NavLink>
              )
          )}
        </ul>
      </div>

      {/* bottom user name */}
      <div
        className={` flex flex-row justify-between ${
          open ? "" : "justify-between items-center"
        }`}
      >
        <div className="flex flex-row">
          <img
            src="https://picsum.photos/id/236/200/300"
            alt="avater"
            className={`w-10 h-10 rounded-full ${open ? "" : "w-5 h-5 p-0"} `}
          />
          <div
            className={`flex flex-row justify-between items-center overflow-hidden  ${
              open ? "w-32 ml-3" : "w-0"
            }`}
          >
            {/* have eto fix the logo alignment */}
            <div className="leading-4 flex flex-row justify-between items-center w-full">
              <div>
                <h4 className="font-semibold text-xs">{user?.name}</h4>
                <span className="text-xs text-gray-600">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex justify-center items-center ${
            !open ? "invisible" : ""
          }`}
        >
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
