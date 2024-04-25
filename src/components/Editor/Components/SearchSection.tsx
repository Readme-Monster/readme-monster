import React from "react";

const SearchSection = () => {
  return (
    <input 
      type="text" 
      className="w-full h-[45px] p-[10px] rounded-[8px] border-solid border drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)] border-[#F1F3F5]" 
      placeholder="section 제목을 입력해주세요"
    />
  );
};

export default SearchSection;