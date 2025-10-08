import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { sidebarItems } from "../../constants/sidebarItems";
import AppSidebar from "../customComponents/app-sidebar";

const CoordinatorLayout = () => {
  return (
    <SidebarProvider>
      <div className=" flex h-screen w-screen overflow-hidden bg-backgroundFill">
        <AppSidebar role="contributor" items={sidebarItems.contributor} />
        <div className="flex-1 flex flex-col h-full overflow-auto">
          <div className="w-full p-4 bg-white shadow-sm flex items-center justify-between rounded-tl-3xl border-l-4 border-color8">
            <div className="flex items-center gap-4 ">
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
              <h1 className="text-2xl font-bold">contributor Layout</h1>
            </div>
          </div>
          <main className="flex-1 p-6 w-full bg-white rounded-bl-3xl border-l-4 border-color8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CoordinatorLayout;