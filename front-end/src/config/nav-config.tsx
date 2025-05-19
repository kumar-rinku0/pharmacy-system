import {
  Bell,
  Briefcase,
  Home,
  LayoutDashboard,
  LogOut,
  Pill,
  PillBottle,
  PlusCircle,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useLocation } from "react-router";

// after login desktop!
export const NavItems = () => {
  // const { id } = useParams();
  const { pathname } = useLocation();
  function isNavItemActive(pathname: string, path: string) {
    return pathname.includes(path);
  }
  return [
    {
      groupName: "",
      position: "top",
      groupContent: [
        {
          name: "Dashboard",
          href: `/dashboard`,
          icon: <LayoutDashboard size={20} />,
          active: pathname === `/dashboard`,
        },
        {
          name: "Search",
          href: `/dashboard/search`,
          icon: <Search size={20} />,
          active: isNavItemActive(pathname, `/dashboard/search`),
        },
      ],
    },
    {
      groupName: "Pharmacy Manager",
      position: "top",
      groupContent: [
        {
          name: "Create Pharmacy",
          href: `/dashboard/create-pharmacy`,
          icon: <PlusCircle size={20} />,
          active: pathname === `/dashboard/create-pharmacy`,
        },

        {
          name: "List Of Pharmacy",
          href: `/dashboard/list-pharmacy`,
          icon: <PillBottle size={20} />,
          active: isNavItemActive(pathname, `/dashboard/list-pharmacy`),
        },
      ],
    },
    {
      groupName: "",
      position: "top",
      groupContent: [
        {
          name: "Medication",
          href: `/dashboard/medication`,
          icon: <Pill size={20} />,
          active: isNavItemActive(pathname, `/dashboard/medication`),
        },
        {
          name: "Profile",
          href: `/dashboard/profile`,
          icon: <User size={20} />,
          active: isNavItemActive(pathname, `/dashboard/profile`),
        },
        {
          name: "Notifications",
          href: `/dashboard/notifications`,
          icon: <Bell size={20} />,
          active: isNavItemActive(pathname, `/dashboard/notifications`),
        },
        {
          name: "Log Out",
          href: `/logout`,
          icon: <LogOut size={20} />,
          active: isNavItemActive(pathname, `/logout`),
        },
      ],
    },
    // {
    //   groupName: "",
    //   position: "bottom",
    //   groupContent: [
    //     {
    //       name: "Settings",
    //       href: `/settings`,
    //       icon: <Settings size={20} />,
    //       active: isNavItemActive(pathname, `/settings`),
    //     },
    //   ],
    // },
  ];
};

// before login

export const MobileNavItems = () => {
  const { pathname } = useLocation();
  function isNavItemActive(pathname: string, path: string) {
    return pathname.includes(path);
  }

  return [
    {
      name: "Home",
      href: "/",
      icon: <Home size={20} />,
      active: pathname === "/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      active: isNavItemActive(pathname, "/dashboard"),
    },
    {
      name: "Projects",
      href: "/projects",
      icon: <Briefcase size={20} />,
      active: isNavItemActive(pathname, "/projects"),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <User size={20} />,
      active: isNavItemActive(pathname, "/profile"),
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <Bell size={20} />,
      active: isNavItemActive(pathname, "/notifications"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings size={20} />,
      active: isNavItemActive(pathname, "/settings"),
    },
  ];
};
