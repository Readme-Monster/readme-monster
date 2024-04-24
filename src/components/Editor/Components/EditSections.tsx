import React from "react";
import EditSection from "./EditSection";

const EditSections = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex-Center flex-row justify-between pt-[10px]">
        <p className="text-textSecondary ml-[5px]">Edit Section</p>
      </div>
      <div className="flex flex-col gap-[10px]">
        <EditSection/>
        <EditSection/>
        <EditSection/>
        <EditSection/>
      </div>
    </div>
  );
};

export default EditSections;

