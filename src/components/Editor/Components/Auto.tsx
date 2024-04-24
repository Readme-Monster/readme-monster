import React from "react";
// import EditSections from "./EditSections";
// import SelectSections from "./SelectSections";
import AutoForm from "./AutoForm";

const Auto = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[20px]">
      {/* <div className="w-full h-auto">
        <EditSections/>
      </div>
      <div className="w-full h-auto">
        <SelectSections/>
      </div> */}
      <AutoForm/>
    </div>
 
  );
};

export default Auto;