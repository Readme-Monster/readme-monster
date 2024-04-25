import React, { useState } from "react";
import Editor from "./Components/Editor";
import Preview from "./Components/Preview";
import Raw from "./Components/Raw";
import { Tab, Tabs } from "../Common/Tabs";

const EditorPreviewContainer = () => {
  const [selectedTab, setSelectedTab] = useState<string | undefined>("preivew");

  const onChange = (value?: string) => {
    setSelectedTab(value);
  };

  return (
    <>
      <div className="w-1/2">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="min-h-[30px] mx-[15px] flex items-center">
            <p className="text-textBlue font-semibold mb-0">Edior</p>
          </div>
          <Editor />
        </div>
      </div>
      <div className="w-1/2">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <Tabs>
            <Tab value="preview">Preview</Tab>
            <Tab value="raw">Raw</Tab>
          </Tabs>
          {selectedTab === "preivew" && <Preview />}
          {selectedTab === "raw" && <Raw />}
        </div>
      </div>
    </>
  );
};

export default EditorPreviewContainer;
