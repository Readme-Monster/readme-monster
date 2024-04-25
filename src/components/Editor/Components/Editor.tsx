import React from "react";

const Editor = () => {
  const test = [1];
  return (
    test.length > 0 ? <div className="w-full h-full rounded-[8px] bg-[#333333]"></div> : <EmptySections/>
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