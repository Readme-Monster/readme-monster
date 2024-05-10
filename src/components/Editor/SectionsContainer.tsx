import { Tab, Tabs } from "../../components/Common/Tabs";
import React, { useState } from "react";
import Auto from "./Components/Auto";
import Builder from "./Components/Builder";
import { useTab } from "context/TabContext";

const SectionsContainer = () => {
  // const [selectedTab, setSelectedTab] = useState<string | undefined>("Builder");
  const { selectedTab, setTab } = useTab();

  const handleTabClick = (value: string | undefined) => {
    setTab(value!);
  };

  return (
    <div className="w-full h-full flex flex-col gap-[10px]">
      <div className="w-full">
        <Tabs value={selectedTab} onClick={handleTabClick}>
          <Tab value="Builder">Builder</Tab>
          <Tab value="Auto">Auto</Tab>
        </Tabs>
      </div>
      <div className="w-full h-full flex flex-col gap-[10px] overflow-y-scroll">
        {selectedTab === "Builder" && <Builder />}
        {selectedTab === "Auto" && <Auto />}
      </div>
    </div>
  );
};

export default SectionsContainer;
