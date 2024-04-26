import { Tab, Tabs } from "components/Common/Tabs";
import React, { useState } from "react";
import Auto from "./Components/Auto";
import Builder from "./Components/Builder";

const SectionsContainer = () => {
  const [selectedTab, setSelectedTab] = useState<string | undefined>("Builder");

  const handleTabClick = (value?: string | undefined) => {
    setSelectedTab(value);
  };

  return (
    <div className="w-full h-full flex flex-col gap-[10px]">
      <Tabs value={selectedTab} onClick={handleTabClick}>
        <Tab value="Builder">Builder</Tab>
        <Tab value="Auto">Auto</Tab>
      </Tabs>
      <div className="w-full h-full flex flex-col gap-[10px] overflow-y-scroll">
        {selectedTab === "Builder" && <Builder />}
        {selectedTab === "Auto" && <Auto />}
      </div>
    </div>
  );
};

export default SectionsContainer;
