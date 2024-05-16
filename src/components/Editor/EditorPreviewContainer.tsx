import React, { useEffect, useState } from "react";
import Preview from "./Components/Preview";
import Raw from "./Components/Raw";
import { Tab, Tabs } from "../Common/Tabs";
import { useSection } from "../../context/SectionContext";
import Editor from "./Components/Editor";
import { Download } from "@carbon/icons-react";
import clsx from "clsx";
import useMediaQuery from "components/Common/useMediaQuery";

const EditorPreviewContainer = () => {
  const { state } = useSection();
  const matches = useMediaQuery("mobile");
  const markDownsData = state.editSections.map(el => el.markdown).join("");
  const [selectedTab, setSelectedTab] = useState<string | undefined>(() => "preview");

  const handleTabClick = (value?: string | undefined) => {
    setSelectedTab(value);
  };

  const onDownloadMarkdown = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([markDownsData], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "README.md";
      document.body.appendChild(element);
      element.click();
      element.remove();
      setTimeout(() => {
        alert("Download is complete");
      }, 500);
    } catch (error) {
      alert("Download failed.");
    }
  };

  useEffect(() => {
    if (matches) {
      setSelectedTab("editor");
    } else {
      setSelectedTab("preview");
    }
  }, [matches]);

  return matches ? (
    <>
      <div className="w-full flex flex-col gap-[10px]">
        <div className="w-full min-h-[35px] flex flex-row items-center px-[5px]">
          <Tabs value={selectedTab} onClick={handleTabClick}>
            <Tab value="editor">Editor</Tab>
            <Tab value="preview">Preview</Tab>
            <Tab value="raw">Raw</Tab>
          </Tabs>
          <DownloadBtn onDownloadMarkdown={onDownloadMarkdown} matches={matches} />
        </div>
        {selectedTab === "editor" && <Editor />}
        {selectedTab === "preview" && <Preview value={markDownsData} />}
        {selectedTab === "raw" && <Raw value={markDownsData} />}
      </div>
    </>
  ) : (
    <>
      <div className="w-[calc(50%-15px)]">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="min-h-[35px] mx-[5px] flex items-center">
            <p className="text-textBlue font-semibold mb-0">Editor</p>
          </div>
          <Editor />
        </div>
      </div>
      <div className="w-[calc(50%-15px)]">
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="min-h-[35px] flex flex-row mx-[5px]">
            <div className="w-full h-full">
              <Tabs value={selectedTab} onClick={handleTabClick}>
                <Tab value="preview">Preview</Tab>
                <Tab value="raw">Raw</Tab>
              </Tabs>
            </div>
            <DownloadBtn onDownloadMarkdown={onDownloadMarkdown} />
          </div>
          {selectedTab === "preview" && <Preview value={markDownsData} />}
          {selectedTab === "raw" && <Raw value={markDownsData} />}
        </div>
      </div>
    </>
  );
};

export default EditorPreviewContainer;

const DownloadBtn = ({ onDownloadMarkdown, matches }: { onDownloadMarkdown: () => void; matches?: boolean }) => {
  const { state } = useSection();
  return (
    <button
      onClick={onDownloadMarkdown}
      className={clsx(
        "min-w-fit w-auto min-h-[35px]",
        "flex flex-row gap-[8px] items-center",
        "px-[15px]",
        "bg-textBlue text-white ",
        "rounded-[8px]",
        {
          "hover:bg-[#6E9EFF]": state.editSections.length > 0,
          "cursor-pointer": state.editSections.length > 0,
        },
        {
          "bg-textTertiary": state.editSections.length === 0,
        },
      )}
      disabled={state.editSections.length > 0 ? false : true}
    >
      <Download size={16} />
      {!matches && <p className="min-w-fit mb-0 text-sm">다운로드</p>}
    </button>
  );
};
