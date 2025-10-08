import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarFooter,
} from "../ui/sidebar";
import { NavUser } from "../customComponents/nav-user";
import { useAuthStore } from "@/store/authStore";

import AppLogoFull from "../../assets/appLogo/logo.svg";
import AppLogoIcon from "../../assets/appLogo/appLogo.svg";

const AppSidebar = ({ role, items }) => {
  const { user } = useAuthStore();

  return (
    <Sidebar
      role={role}
      collapsible="icon"
      className="bg-backgroundFill"
      style={{
        "--sidebar-width": "16rem",
        "--sidebar-width-icon": "4rem",
      }}
    >
      <SidebarContent className="bg-backgroundFill">
        <SidebarHeader className="flex justify-between items-center pt-6">
          <div className="flex items-center justify-center w-full">
            <img
              src={AppLogoFull}
              alt="NAAC"
              className="h-8 group-data-[collapsible=icon]:hidden"
            />
            <img
              src={AppLogoIcon}
              alt="NAAC"
              className="h-8 w-auto hidden group-data-[collapsible=icon]:block"
            />
          </div>
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
        </SidebarHeader>

        <SidebarMenu className="px-5 py-6 gap-1 group-data-[collapsible=icon]:px-4">
          {items.map((item, index) => (
            <React.Fragment key={item.path}>
              <SidebarMenuItem>
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      tooltip={item.label}
                      isActive={isActive}
                      className={`w-full text-color1 hover:bg-blue-50 hover:text-primary min-h-[2.5rem] group-data-[collapsible=icon]:justify-center ${
                        isActive
                          ? "bg-gradient-custom text-white [&>svg]:text-white hover:text-white"
                          : "hover:bg-blue-50 hover:text-primary"
                      }`}
                    >
                      <item.icon className="h-6 w-6 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5" />
                      <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>

              {role === "coordinator" && index === 4 && (
                <SidebarSeparator className="bg-color8 my-2" />
              )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-backgroundFill">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>

  );
};

export default AppSidebar;
