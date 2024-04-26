import React, { useState } from "react";
import Editor from "./Components/Editor";
import Preview from "./Components/Preview";
import Raw from "./Components/Raw";
import { Tab, Tabs } from "../Common/Tabs";

const EditorPreviewContainer = () => {
  const [selectedTab, setSelectedTab] = useState<string | undefined>("Preview");

  const handleTabClick = (value?: string | undefined) => {
    setSelectedTab(value);
  };

  return (
    <>
      <div className="w-1/2">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="min-h-[30px] mx-[10px] flex items-center">
            <p className="text-textBlue font-semibold mb-0">Edior</p>
          </div>
          <Editor />
        </div>
      </div>
      <div className="w-1/2">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <Tabs value={selectedTab} onClick={handleTabClick}>
            <Tab value="Preview">Preview</Tab>
            <Tab value="Raw">Raw</Tab>
          </Tabs>
          {selectedTab === "Preview" && <Preview />}
          {selectedTab === "Raw" && <Raw />}
        </div>
      </div>
    </>
  );
};

export default EditorPreviewContainer;
