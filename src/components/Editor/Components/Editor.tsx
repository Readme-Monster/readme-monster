import React from "react";
import { useSection } from "context/SectionContext";
import MDEditor, { commands } from "@uiw/react-md-editor";

const Editor = () => {
  const { sections, addSection } = useSection();
  const commandsList = [...commands.getCommands()].slice(0, 17);

  return (
    <div
      className="w-full h-full rounded-[8px] border-solid border border-textTertiary overflow-y-auto"
      data-color-mode="dark"
    >
      <MDEditor
        className="editor"
        value={sections[0]}
        onChange={value => addSection(value!)}
        preview="edit"
        height="100%"
        commands={commandsList}
        extraCommands={[]}
        visibleDragbar={false}
        style={{
          height: "100%",
          overflow: "scroll",
          border: "none",
        }}
      />
    </div>
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
