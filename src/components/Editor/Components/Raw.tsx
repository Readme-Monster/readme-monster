import React, { useRef } from "react";
import { Copy } from "@carbon/icons-react";
import { ValueType } from "../types";

const Raw = ({ value }: ValueType) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const onCopyMarkdown = async () => {
    textAreaRef.current?.select();
    try {
      await navigator.clipboard.writeText(value!);
      alert("Copying is complete.");
    } catch (e) {
      alert("Copying failed.");
    }
  };

  return (
    <div className="w-full h-full rounded-[8px] border-solid border border-textTertiary relative">
      {value!.length > 0 && (
        <div className="h-auto absolute top-[20px] right-[20px]" onClick={onCopyMarkdown}>
          <Copy size={18} className="cursor-pointer" />
        </div>
      )}
      <textarea
        defaultValue={value}
        ref={textAreaRef}
        key={value}
        readOnly
        className="h-full w-full resize-none focus:outline-none p-[20px] rounded-[7px]"
      />
    </div>
  );
};

export default Raw;
