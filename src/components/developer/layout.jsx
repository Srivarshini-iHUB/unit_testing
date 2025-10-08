import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { sidebarItems } from "../../constants/sidebarItems";
import AppSidebar from "../customComponents/app-sidebar";
import { cn } from "@/lib/utils"; 

const DeveloperLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar role="developer" items={sidebarItems.developer} />

        <div className="flex flex-col flex-1 h-full overflow-auto">
          <div className={cn("flex items-center gap-4", "p-4")}>
            <SidebarTrigger className="hidden md:block" />
          </div>

          <main className={cn("flex-1 w-full", "bg-white")}>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DeveloperLayout;
