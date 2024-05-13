import React, { useEffect, useState } from "react";
import { useSection } from "context/SectionContext";
import MDEditor, { commands } from "@uiw/react-md-editor";

const Editor = () => {
  const { state, actions } = useSection();
  const commandsList = [...commands.getCommands()].slice(0, 17);

  const [markdownValue, setMarkdownValue] = useState<string>("");

  const onEditEditor = (value: string) => {
    setMarkdownValue(value);
    actions.setEditSections(prev =>
      prev.map(markdown => {
        if (markdown.id === state.editorMarkDown.id) {
          return { ...markdown, markdown: value };
        } else {
          return markdown;
        }
      }),
    );
  };

  useEffect(() => {
    const markdown = state.editorMarkDown.markdown;
    if (markdown) {
      setMarkdownValue(markdown);
    }
  }, [state.editorMarkDown]);

  return (
    <div
      className="w-full h-full rounded-[8px] border-solid border border-textTertiary overflow-y-auto"
      data-color-mode="dark"
    >
      {state.editSections.length > 0 ? (
        <MDEditor
          className="editor"
          value={markdownValue}
          onChange={value => {
            onEditEditor(value!);
          }}
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
      ) : (
        <EmptySections />
      )}
    </div>
  );
};

export default Editor;

const EmptySections = () => {
  return (
    <div className="w-full h-full flex-Center p-[20px]">
      <p className="text-textBlue">Select a section from the left sidebar to edit the contents</p>
    </div>
  );
};
