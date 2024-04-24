import React from "react";
import Editor from "./Components/Editor";
import Preview from "./Components/Preview";
// import Raw from "./Components/Raw";

const EditorPreviewContainer = () => {
  return (
    <>
      <div className="w-1/2">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="min-h-[30px] mx-[15px] flex items-center">
            <p className="text-textBlue font-semibold">Edior</p>
          </div>
          <Editor/>
        </div>
      </div>
      <div className="w-1/2">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="h-[30px]"></div>
          <Preview/>
          {/* <Raw/> */}
        </div>
      </div>
    </>
  );
};

export default EditorPreviewContainer;