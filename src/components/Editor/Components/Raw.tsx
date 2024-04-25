import React from "react";
import { Copy } from "@carbon/icons-react";

const Raw = () => {
  return (
    <div className=  "w-full h-full p-[20px] rounded-[8px] border-solid border border-textTertiary">
      <div className="w-full flex justify-end">
        <Copy size={20} className="cursor-pointer" onClick={() => alert("복사하기가 완료되었습니다.")}/>
      </div>
    </div>
  );
};

export default Raw;