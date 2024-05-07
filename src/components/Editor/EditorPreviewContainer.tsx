import React, { useEffect, useState } from "react";
import Preview from "./Components/Preview";
import Raw from "./Components/Raw";
import { Tab, Tabs } from "../Common/Tabs";
import { useSection, useActiveSection } from "../../context/SectionContext";
import Editor from "./Components/Editor";
import { Download } from "@carbon/icons-react";
import clsx from "clsx";

const EditorPreviewContainer = () => {
  const { sections } = useSection();
  const { setActiveContent, activeContent } = useActiveSection();

  const [selectedTab, setSelectedTab] = useState<string | undefined>("Preview");

  useEffect(() => {
    // sections 배열의 모든 요소를 하나의 문자열로 합치기
    const combinedSections = sections.join("\n");
    setActiveContent(combinedSections);
  }, [sections, setActiveContent]); // sections가 변경될 때마다 실행

  const handleTabClick = (value?: string | undefined) => {
    setSelectedTab(value);
  };

  const onDownloadMarkdown = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([activeContent], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "README.md";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element); // Clean up
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
                { "hover:bg-[#6E9EFF]": sections.length > 0, "cursor-pointer": sections.length > 0 },
                {
                  "bg-textTertiary": sections.length === 0,
                },
              )}
              disabled={sections.length > 0 ? false : true}
            >
              <Download size={16} />
              <p className="mb-0 text-sm">Download</p>
            </button>
          </div>
          {selectedTab === "Preview" && <Preview value={activeContent} />}
          {selectedTab === "Raw" && <Raw value={activeContent} />}
        </div>
      </div>
    </>
  );
};

export default EditorPreviewContainer;
