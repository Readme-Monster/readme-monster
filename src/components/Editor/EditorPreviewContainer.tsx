import React, { useState } from "react";
import Preview from "./Components/Preview";
import Raw from "./Components/Raw";
import { Tab, Tabs } from "../Common/Tabs";
import { useSection } from "../../context/SectionContext";
import Editor from "./Components/Editor";
import { Download } from "@carbon/icons-react";
import clsx from "clsx";

const EditorPreviewContainer = () => {
  const { value } = useSection();
  const [selectedTab, setSelectedTab] = useState<string | undefined>("Preview");

  const handleTabClick = (value?: string | undefined) => {
    setSelectedTab(value);
  };

  const onDownloadMarkdown = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([value], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "README.md";
      document.body.appendChild(element);
      element.click();
      alert("Download is complete");
    } catch (error) {
      alert("Download failed.");
    }
  };

  return (
    <>
      <div className="w-1/2">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="min-h-[35px] mx-[5px] flex items-center">
            <p className="text-textBlue font-semibold mb-0">Editor</p>
          </div>
          <Editor />
        </div>
      </div>
      <div className="w-1/2">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="min-h-[35px] flex flex-row mx-[5px]">
            <div className="w-full h-full">
              <Tabs value={selectedTab} onClick={handleTabClick}>
                <Tab value="Preview">Preview</Tab>
                <Tab value="Raw">Raw</Tab>
              </Tabs>
            </div>
            <button
              onClick={onDownloadMarkdown}
              className={clsx(
                "w-auto h-full",
                "flex flex-row gap-[8px] items-center",
                "px-[12px]",
                "bg-textBlue text-white ",
                "rounded-[8px]",
                {
                  "hover:bg-[#6E9EFF]": value.length > 0,
                  "cursor-pointer": value.length > 0,
                },
                {
                  "bg-textTertiary": value.length === 0,
                },
              )}
              disabled={value.length > 0 ? false : true}
            >
              <Download size={16} />
              <p className="mb-0 text-sm">Download</p>
            </button>
          </div>
          {selectedTab === "Preview" && <Preview value={value} />}
          {selectedTab === "Raw" && <Raw value={value} />}
        </div>
      </div>
    </>
  );
};

export default EditorPreviewContainer;
