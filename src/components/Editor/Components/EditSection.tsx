import React, { useState } from "react";
import { List, Reset, TrashCan } from "@carbon/icons-react";

const EditSection = () => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave} 
      className="
      w-full h-[45px] py-[8px] px-[12px]
      flex flex-row gap-[10px] items-center
      rounded-[8px] border-solid border bg-white border-[#F1F3F5] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)] 
      cursor-pointer"
    >
      <List size={25} className="fill-textSecondary"/>
      <div>
        <p className="text-textPrimary">
        </p>
      </div>
      {hover && 
        <div className="flex flex-row gap-[10px] ml-auto">
          <Reset size={20} className="fill-[#ADB5BD]" onClick={() => alert("rest")}/>
          <TrashCan size={20} className="fill-textPrimary" onClick={() => alert("delete")}/>
        </div>}
    </div>
  );
};

export default EditSection;