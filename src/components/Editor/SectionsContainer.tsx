import React from "react";
import Auto from "./Components/Auto";

const SectionsContainer = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[10px]">
      <div className="h-[30px]"></div>
      <Auto/>
    </div>
  );
};

export default SectionsContainer;