import { NavItems } from "@/config/nav-config";
import { ChevronsUpDown, Pill, PillBottle } from "lucide-react";
import { Link } from "react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "./ui/button";

const SideNav = () => {
  const navItems = NavItems();
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Ultra Premium Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-950 text-white transition-all duration-300 hover:shadow-2xl">
        <Link
          className="p-4 lg:p-6 flex flex-col items-center lg:items-start lg:space-x-3 h-auto cursor-pointer"
          to={"/"}
        >
          <Pill className="w-8 h-8 text-indigo-300" />
          <h1 className="block text-xl font-bold tracking-tight">PCS</h1>
        </Link>

        <nav className="w-full flex flex-col items-start gap-1 p-2 lg:p-4">
          {navItems.map((navGroup, idx1) => {
            return (
              <Collapsible className="w-full" key={idx1} defaultOpen>
                <div className="w-full">
                  {navGroup.groupName && (
                    <div className="flex items-center justify-between px-3 py-2 w-full rounded-lg bg-transparent">
                      <PillBottle size={20} />
                      <span>{navGroup.groupName}</span>
                      {navGroup.groupName && (
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronsUpDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      )}
                    </div>
                  )}
                  {navGroup.groupContent.map((groupItem, idx2) => {
                    return (
                      <CollapsibleContent key={idx2}>
                        {navGroup.groupName ? (
                          <Link
                            to={groupItem.href}
                            className={
                              groupItem.active
                                ? "flex items-center justify-start gap-3 px-6 py-2 w-full rounded-lg bg-indigo-800/20 text-white"
                                : "flex items-center justify-start gap-3 px-6 py-2 w-full rounded-lg bg-transparent text-white"
                            }
                          >
                            <span>{groupItem.icon}</span>
                            <span>{groupItem.name}</span>
                          </Link>
                        ) : (
                          <Link
                            to={groupItem.href}
                            className={
                              groupItem.active
                                ? "flex items-center justify-start gap-3 px-3 py-2 w-full rounded-lg bg-indigo-800/20 text-white"
                                : "flex items-center justify-start gap-3 px-3 py-2 w-full rounded-lg bg-transparent text-white"
                            }
                          >
                            <span>{groupItem.icon}</span>
                            <span>{groupItem.name}</span>
                          </Link>
                        )}
                      </CollapsibleContent>
                    );
                  })}
                </div>
              </Collapsible>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default SideNav;
