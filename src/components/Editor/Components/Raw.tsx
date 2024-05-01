import React from "react";
import { Copy } from "@carbon/icons-react";
import { ValueType } from "../types";

const Raw = ({ value }: ValueType) => {
  return (
    <div className="w-full h-full p-[20px] rounded-[8px] border-solid border border-textTertiary relative">
      <div className="h-auto absolute right-[20px]">
        <Copy size={18} className="cursor-pointer" onClick={() => alert("복사하기가 완료되었습니다.")} />
      </div>
      <textarea key={value} readOnly className="h-full w-full resize-none focus:outline-none p-0">
        {value}
      </textarea>
    </div>
  );
};

export default Raw;
