import Header from "common/Header/Header";
import React from "react";
import EditorPreviewContainer from "../../components/Editor/EditorPreviewContainer";
import SectionsContainer from "../../components/Editor/SectionsContainer";

const ReadmeBuilder = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[80px] flex-Center">
        <Header />
      </div>
      <div className="w-full h-[calc(100%_-_80px)]">
        <div className="max-w-full h-full p-[30px] pt-[20px] flex flex-row gap-[30px]">
          <div className="max-w-[400px] w-full h-full">
            <SectionsContainer />
          </div>
          <div className="max-w-full w-full h-full flex flex-row gap-[30px]">
            <EditorPreviewContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeBuilder;
