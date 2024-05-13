import React from "react";
import { SectionsType } from "../types";

interface Props extends SectionsType {
  onClickSection: (e: React.MouseEvent<HTMLElement, MouseEvent>, section: SectionsType) => void;
}

const SelectSection = ({ id, name, title, markdown, onClickSection }: Props) => {
  const section = {
    id,
    name,
    title,
    markdown,
  };

  return (
    <div
      onClick={e => onClickSection(e, section)}
      className="
      w-full h-[45px] py-[8px] px-[12px]
      flex items-center
      rounded-[8px] border-solid border bg-white border-[#F1F3F5] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)]
      cursor-pointer
      hover:ring-2 hover:ring-textBlue
      "
    >
      <p className="text-textPrimary mb-0 truncate">{title}</p>
    </div>
  );
};

export default SelectSection;
