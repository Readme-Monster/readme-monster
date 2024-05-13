import React, { useEffect } from "react";
import EditorPreviewContainer from "../../components/Editor/EditorPreviewContainer";
import SectionsContainer from "../../components/Editor/SectionsContainer";

const ReadmeBuilder = () => {
  const handlePreventRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", handlePreventRefresh);
    })();

    return () => {
      window.removeEventListener("beforeunload", handlePreventRefresh);
    };
  }, []);

  return (
    <div className="w-full h-[calc(100vh_-_80px)] flex flex-col">
      <div className="w-full h-full">
        <div className="max-w-full h-full p-[30px] pt-[20px] flex flex-row gap-[30px]">
          <div className="max-w-[380px] w-full h-full">
            <SectionsContainer />
          </div>
          <div className="max-w-full min-w-[calc(100%_-_410px)] w-full h-full flex flex-row gap-[30px]">
            <EditorPreviewContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeBuilder;
