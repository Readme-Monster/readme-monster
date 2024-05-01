import React from "react";
import SelectSections from "./SelectSections";
import EditSections from "./EditSections";

const Builder = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[20px]">
      <div className="w-full h-auto">
        <EditSections keyName="builder-sections-list" />
      </div>
      <div className="w-full h-auto">
        <SelectSections />
      </div>
    </div>
  );
};

export default Builder;
