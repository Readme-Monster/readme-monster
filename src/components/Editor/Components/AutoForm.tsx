import React from "react";
import RequiredDot from "../../Common/RequiredDot";

const AutoForm = () => {
  return (
    <div className="w-full h-full rounded-[8px] border-solid border border-[#CED4DA] p-[20px]">
      <div className="text-center">
        <p className="font-bold text-textPrimary text-2xl mt-[20px] mb-[10px]">Auto Readme</p>
        <p className="text-textSecondary">
          GitHub 링크를 통해 ChatGPT가
          <br />
          Readme를 대신 써드립니다 
        </p>
      </div>
      <div className="mt-[40px]">
        <div className="w-full h-[70px]">
          <p className="text-textPrimary mb-[10px] ml-[10px]">GitHub 링크 <RequiredDot/></p>
          <input type="text" className="w-full h-[45px] p-[10px] rounded-[8px] border-solid border border-[#DEE2E6]" placeholder="GitHub 링크를 입력해주세요."></input>
        </div>
      </div>
    </div>
  );
};

export default AutoForm;