import React from "react";
import CustomTabs from "../../components/customComponents/customTabs";
import criteriaData from "../../constants/criteriaData";

const NaacCriteria = () => {
  const handleTabChange = (tabId) => {
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-8 text-color1">NAAC Criteria</h1>

      <div className="space-y-6 h-screen">
        <CustomTabs
          tabsData={criteriaData}
          defaultValue="overview"
          onTabChange={handleTabChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default NaacCriteria;
