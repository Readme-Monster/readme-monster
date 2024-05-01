import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { ValueType } from "../types";

const Preview = ({ value }: ValueType) => {
  return (
    <div className="w-full h-full p-[20px] rounded-[8px] border-solid border border-textTertiary overflow-y-scroll">
      <MDEditor.Markdown
        source={value}
        style={{
          overflow: "auto",
        }}
      />
    </div>
  );
};

export default Preview;
