import React from "react";

const Editor = () => {
  const test = [1];
  return (
    <div className="w-full h-full flex flex-col gap-[10px]">
      <div className="h-[30px] mx-[15px] flex items-center"><p className="text-textBlue font-semibold">Edior</p></div>
      {test.length > 0 ? <div className="w-full h-full rounded-[8px] bg-[#333333]"></div> : <EmptySections/>}
    </div>
  );
};

export default Editor;


const EmptySections = () => {
  return (
    <div className="w-full h-full flex-Center">
      <p className="text-textBlue">Select a section from the left sidebar to edit the contents</p>
    </div>
  );
};