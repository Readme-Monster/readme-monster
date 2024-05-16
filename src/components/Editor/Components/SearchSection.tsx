import React from "react";
import { Search } from "@carbon/icons-react";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchSection = ({ search, setSearch }: Props) => {
  return (
    <div className="w-full h-[45px] flex items-center relative">
      <Search size={20} className="absolute z-1 fill-[#495057] ml-[12px] pointer-events-none" />
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
        className="
            w-full h-[45px] p-[10px] pl-[40px]
            rounded-[8px] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)] border border-[#F1F3F5]
            focus:outline-none focus:ring-2 focus:ring-textBlue text-textPrimary
            placeholder-[#ADB5BD] placeholder:text-[14px]
          "
        placeholder="검색하기"
      />
    </div>
  );
};

export default SearchSection;
