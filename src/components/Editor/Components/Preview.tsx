import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { ValueType } from "../types";

const Preview = ({ value }: ValueType) => {
  return (
    <div className="w-full h-full rounded-[8px] border-solid border border-textTertiary overflow-y-scroll">
      <MDEditor.Markdown
        source={value}
        style={{
          overflow: "auto",
          padding: 20,
          height: "100%",
        }}
        className="hide-scrollbar"
      />
    </div>
  );
};

export default Preview;
