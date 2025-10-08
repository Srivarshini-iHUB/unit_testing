import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tab";

/* Status - color mapping */
const statusColorMap = {
  inputColor: "text-inputColor",
  inProgress: "text-inProgress",
  pending: "text-pending",
  completed: "text-completed",
};

const CustomTabs = ({ tabsData, defaultValue, onTabChange, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabsData[0]?.id);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <div className={`flex flex-col h-full w-full ${className}`}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-full">
        {/* Fixed Tab Header with Bottom Border */}
        <div className="relative shrink-0 z-10 bg-white">
          <div className="absolute bottom-0 inset-x-0 border-b-2 border-inputColor z-0" />
          <div className="overflow-x-auto no-scrollbar relative z-10">
            <TabsList className="flex w-max bg-white ">
              {tabsData.map((tab) => {
                const Icon = tab.icon;
                const iconColor = statusColorMap[tab.status] || "text-inputColor";

                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center px-4 py-2 mx-2 rounded-md"
                  >
                    {Icon && <Icon size={16} className={iconColor} />}
                    <span className="truncate text-xs sm:text-sm pl-2">{tab.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {tabsData.map((tab) => {
            const Icon = tab.icon;
            const iconColor = statusColorMap[tab.status] || "text-inputColor";
            const ContentComponent = tab.component;

            return (
              <TabsContent key={tab.id} value={tab.id}>
                <div className="p-6 mt-5">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-color1">
                    {Icon && <Icon size={18} className={iconColor} />}
                    {tab.title}
                  </h3>

                  <div className="space-y-3">
                    <p className="text-color1">
                      Status: <span className={`font-medium ${iconColor}`}>{tab.status}</span>
                    </p>

                    <div>{ContentComponent && <ContentComponent />}</div>                  
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};

export default CustomTabs;
