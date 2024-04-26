import React from "react";
import EditSection from "./EditSection";

const EditSections = () => {
  return (
    <div className="flex flex-col gap-[10px] px-[10px]">
      <div className="flex-Center flex-row justify-between min-h-[30px]">
        <p className="text-textPrimary ml-[5px] mb-0 text-sm">Edit Section</p>
      </div>
      <div className="flex flex-col gap-[10px]">
        <EditSection />
        <EditSection />
        <EditSection />
      </div>
    </div>
  );
};

export default EditSections;
