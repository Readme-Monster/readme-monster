import React from "react";

interface SelectSectionProps {
  sectionTitle: string; // sectionTitle prop 타입 정의
}

const SelectSection: React.FC<SelectSectionProps> = ({ sectionTitle }) => {
  return (
    <div
      className="
      w-full h-[45px] py-[8px] px-[12px]
      flex items-center 
      rounded-[8px] border-solid border bg-white border-[#F1F3F5] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)] 
      cursor-pointer"
    >
      <p className="text-textPrimary mb-0 truncate">{sectionTitle}</p> {/* sectionTitle 값을 표시 */}
    </div>
  );
};

export default SelectSection;
