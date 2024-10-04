import {
    UserRound,
    ShieldCheck,
} from "lucide-react";


type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: any;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
      {
        groupLabel: "Contents",
        menus: [
          {
            href: "/dashboard/users",
            label: "Users",
            active: pathname.includes("/dashboard/users"),
            icon: UserRound,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard/reports",
            label: "Reports",
            active: pathname.includes("/dashboard/reports"),
            icon: ShieldCheck,
            submenus: [],
          },
        ],
      },
     
    ];
  }