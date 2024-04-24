import React from "react";
import EditorPreviewContainer from "../../components/Editor/EditorPreviewContainer";
import SectionsContainer from "../../components/Editor/SectionsContainer";

const ReadmeBuilder = () => {
  return (
    <div className="w-full h-[calc(100%_-_64px)]">
      <div className="max-w-full h-full p-[35px] flex flex-row gap-[30px]">
        <div className="max-w-[400px] w-full h-full">
          <SectionsContainer/>
        </div>
        <div className="max-w-full w-full h-full flex flex-row gap-[30px]">
          <EditorPreviewContainer/>
        </div>
      </div> 
    </div>
  );
};

export default ReadmeBuilder;