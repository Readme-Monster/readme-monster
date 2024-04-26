import React from "react";
import RequiredDot from "../../Common/RequiredDot";
import { Add, Link } from "@carbon/icons-react";

interface List {
  title: string;
  placeholder: string;
}
interface Props {
  onClick: () => void;
}

const AutoForm = ({ onClick }: Props) => {
  const formList: List[] = [
    { title: "프로젝트 제목", placeholder: "프로젝트 제목을 입력해주세요." },
    { title: "프로젝트 소개", placeholder: "프로젝트 소개를 입력해주세요." },
    { title: "프로젝트 기술", placeholder: "프로젝트 기술을 입력해주세요." },
    { title: "프로젝트 개요", placeholder: "프로젝트 개요를 입력해주세요." },
  ];

  return (
    <div className="w-full h-full max-h-full rounded-[8px] border-solid border border-textTertiary p-[20px] flex flex-col gap-[30px]">
      <div className="w-full min-h-[140px] flex-Center flex-col text-center">
        <p className="font-bold text-textPrimary text-3xl mb-[10px]">Auto Readme</p>
        <p className="text-textSecondary mb-0">
          GitHub 링크를 통해 ChatGPT가
          <br />
          Readme를 대신 써드립니다
        </p>
      </div>
      <div className="h-[100%] flex flex-col gap-[30px] px-[10px] overflow-scroll">
        <div className="w-full h-[70px]">
          <p className="text-textPrimary mb-[10px] ml-[10px] ">
            GitHub 링크 <RequiredDot />
          </p>
          <div className="w-full h-[45px] flex items-center relative">
            <Link size={20} className="absolute z-1 fill-[#495057] ml-[12px] pointer-events-none" />
            <input
              type="text"
              className="
                w-full h-[45px] p-[10px] pl-[40px]
                rounded-[8px] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)] border border-[#F1F3F5]
                focus:outline-none focus:ring-2 focus:ring-textBlue
                placeholder-[#ADB5BD] placeholder:text-[14px]
              "
              placeholder="GitHub 링크를 입력해주세요."
            />
          </div>
        </div>
        {formList?.map(({ title, placeholder }) => (
          <div className="w-full h-[70px]" key={title}>
            <p className="text-textPrimary mb-[10px] ml-[10px]">{title}</p>
            <input
              type="text"
              className="
              w-full h-[45px] p-[10px]
              focus:outline-none focus:ring-2 focus:ring-textBlue
              rounded-[8px] border-solid border border-[#DEE2E6]
              placeholder-[#ADB5BD] placeholder:text-[14px]
              "
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
      <div className="w-full min-h-[40px] cursor-pointer flex justify-center" onClick={() => alert("추가 버튼")}>
        <Add size={40} className="fill-textBlue" />
      </div>
      <div className="w-full flex flex-row min-h-[45px] gap-[20px] px-[10px]">
        <button className="w-1/2 rounded-[8px] border-solid border border-textTertiary text-textPrimary hover:bg-gray-50">
          Cancle
        </button>
        <button onClick={() => onClick()} className="w-1/2 rounded-[8px] bg-textBlue text-white hover:bg-[#6E9EFF]">
          Create
        </button>
      </div>
    </div>
  );
};

export default AutoForm;
