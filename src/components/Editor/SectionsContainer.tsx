import React from "react";
import Auto from "./Components/Auto";
import Builder from "./Components/Builder";


const SectionsContainer = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[10px]">
      <div className="min-h-[30px] mx-[15px] flex items-center">
      </div>
      {/* <Auto/> */}
      <Builder/>
    </div>
  );
};

export default SectionsContainer;