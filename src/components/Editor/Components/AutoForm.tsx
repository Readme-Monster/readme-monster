import React, { useRef, useState } from "react";
import RequiredDot from "../../Common/RequiredDot";
import { Add, Link } from "@carbon/icons-react";
import AiGenerator from "./AiGenerator";
import AddAutoContentsModal from "../Modal/AddAutoContentsModal";

interface List {
  title: string;
}

const AutoForm = () => {
  // const formList: List[] = [
  //   // { title: "프로젝트 제목", placeholder: "프로젝트 제목을 입력해주세요." },
  // ];

  const [formList, setFormList] = useState<List[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [openAiKey, setOpenAiKey] = useState<string>("");
  const [githubAddress, setGithubAddress] = useState<string>("");
  const [techStack, setTechStack] = useState<string>("");
  const [packageManager, setPackageManager] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };

  const openModalAlert = () => {
    setOpenModal(!openModal);
  };

  const createInputStyle = (value: string, link?: boolean) => {
    return `
      w-full h-[45px] p-[10px] ${link ? "pl-[40px]" : "pl-[10px]"}
      rounded-[8px] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)] border border-[#F1F3F5]
      focus:outline-none focus:ring-2 focus:ring-textBlue
      placeholder-[#ADB5BD] placeholder:text-[14px] text-textPrimary
      ${value === "" ? "bg-red-100" : "bg-white"}
    `;
  };

  const openAiInputStyle = createInputStyle(openAiKey);
  const githubInputStyle = createInputStyle(githubAddress, true);
  const techStackInputStyle = createInputStyle(techStack);
  const packageManagerInputStyle = createInputStyle(packageManager);
  const descriptionInputStyle = createInputStyle(description);

  return (
    <div className="w-full h-full max-h-full rounded-[8px] bg-white border-solid border border-textTertiary p-[20px] flex flex-col gap-[30px]">
      <div className="w-full min-h-[140px] flex-Center flex-col text-center">
        <p className="font-bold text-textPrimary text-3xl mb-[10px]">Auto Readme</p>
        <p className="text-textSecondary mb-0">
          GitHub 링크를 통해 ChatGPT가
          <br />
          Readme를 대신 써드립니다
        </p>
      </div>
      <div className="h-[100%] flex flex-col gap-[30px] px-[10px] overflow-scroll hide-scrollbar">
        <div className="w-full h-[70px]">
          <p className="text-textPrimary mb-[10px] ml-[10px] ">
            GitHub 링크 <RequiredDot />
          </p>
          <div className="w-full h-[45px] flex items-center relative">
            <Link size={20} className="absolute z-1 fill-[#495057] ml-[12px] pointer-events-none" />
            <input
              type="text"
              className={githubInputStyle}
              placeholder="GitHub 링크를 입력해주세요."
              onChange={e => {
                setGithubAddress(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full h-[70px]">
          <p className="text-textPrimary mb-[10px] ml-[10px] ">
            OpenAI KEY <RequiredDot />
          </p>
          <div className="w-full h-[45px] flex items-center relative">
            <input
              type="text"
              className={openAiInputStyle}
              placeholder="OpenAI KEY를 입력해주세요."
              onChange={e => {
                setOpenAiKey(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full h-[70px]">
          <p className="text-textPrimary mb-[10px] ml-[10px] ">
            프로젝트 설명 <RequiredDot />
          </p>
          <div className="w-full h-[45px] flex items-center relative">
            <input
              type="text"
              className={descriptionInputStyle}
              placeholder="프로젝트에 대한 간단한 설명을 입력해주세요."
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full h-[70px]">
          <p className="text-textPrimary mb-[10px] ml-[10px] ">
            사용한 기술스택 <RequiredDot />
          </p>
          <div className="w-full h-[45px] flex items-center relative">
            <input
              type="text"
              className={techStackInputStyle}
              placeholder="사용한 기술스택을 입력해주세요."
              onChange={e => {
                setTechStack(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full h-[70px]">
          <p className="text-textPrimary mb-[10px] ml-[10px] ">
            사용한 Package Manager <RequiredDot />
          </p>
          <div className="w-full h-[45px] flex items-center relative">
            <input
              type="text"
              className={packageManagerInputStyle}
              placeholder="사용한 package manager를 입력해주세요."
              onChange={e => {
                setPackageManager(e.target.value);
              }}
            />
          </div>
        </div>
        {formList?.map(({ title }) => (
          <div className="w-full h-[70px]" key={title}>
            <p className="text-textPrimary mb-[10px] ml-[10px]">{title}</p>
            <input
              type="text"
              className="
              w-full h-[45px] p-[10px]
              focus:outline-none focus:ring-2 focus:ring-textBlue
              rounded-[8px] border-solid border border-[#DEE2E6] text-textPrimary
              placeholder-[#ADB5BD] placeholder:text-[14px]
              "
              placeholder={"값을 입력해주세요."}
              onChange={e => {
                setFormList(prev =>
                  prev.map(item => {
                    if (item.title === title) {
                      return { title, value: e.target.value };
                    }
                    return item;
                  }),
                );
              }}
            />
          </div>
        ))}
      </div>
      <div className="w-full min-h-[40px] cursor-pointer flex justify-center" onClick={openModalAlert}>
        <Add size={40} className="fill-textBlue" />
      </div>
      <div className="w-full flex flex-row min-h-[45px] gap-[20px] px-[10px]">
        <button className="w-1/2 rounded-[8px] border-solid border border-textTertiary text-textPrimary hover:bg-gray-50">
          취소하기
        </button>
        <AiGenerator
          openAiKey={openAiKey}
          githubAddress={githubAddress}
          formList={formList}
          techStack={techStack}
          packageManager={packageManager}
          description={description}
        />
      </div>
      {openModal && (
        <AddAutoContentsModal
          modalRef={modalRef}
          modalOutSideClick={modalOutSideClick}
          onClose={openModalAlert}
          openModal={openModal}
          setFormList={setFormList}
        />
      )}
    </div>
  );
};

export default AutoForm;
