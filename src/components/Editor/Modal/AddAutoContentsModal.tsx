import React, { useEffect, useRef, useState } from "react";

interface Props {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutSideClick: (e: any) => void;
  onClose: () => void;
  openModal: boolean;
  setFormList: React.Dispatch<React.SetStateAction<{ title: string }[]>>;
}

const AddSectionModal = ({ modalRef, modalOutSideClick, onClose, openModal, setFormList }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (openModal) {
      inputRef.current?.focus();
    }
  }, []);

  const [infoTitle, setInfoTitle] = useState<string>("");
  //   const [infoDescription, setInfoDescription] = useState<string>("");

  const addInfo = () => {
    if (infoTitle === "") {
      alert("추가할 내용을 입력해주세요");
      return;
    }

    setFormList(prev => [...prev, { title: infoTitle }]);
    onClose();
  };

  return (
    <div
      ref={modalRef}
      onClick={e => modalOutSideClick(e)}
      className="h-full w-full z-10 fixed left-0 top-0 flex-Center bg-textPrimary bg-opacity-70"
    >
      <div className="w-full max-w-[550px] h-auto bg-white rounded-[8px] p-[20px] flex flex-col">
        <div className="text-center p-[20px]">
          <p className="text-textBlue text-2xl font-bold mb-0">Add More Info</p>
        </div>
        <div className="my-[20px]">
          <input
            ref={inputRef}
            type="text"
            className="
              w-full h-[45px] p-[10px] 
              rounded-[8px] border-solid border border-[#DEE2E6] 
              placeholder-[#ADB5BD] placeholder:text-[14px]
              focus:outline-none focus:ring-2 focus:ring-textBlue"
            placeholder="추가할 정보의 제목을 입력해 주세요."
            onChange={e => setInfoTitle(e.target.value)}
          />
          {/* <div className="text-left p-[10px]">
            <p className="text-black text-l font-bold mb-0">추가할 요소에 대한 설명</p>
          </div>
          <input
            ref={inputRef}
            type="text"
            className="
              w-full h-[45px] p-[10px] 
              rounded-[8px] border-solid border border-[#DEE2E6] 
              placeholder-[#ADB5BD] placeholder:text-[14px]
              focus:outline-none focus:ring-2 focus:ring-textBlue"
            placeholder="Info Description"
            onChange={e => setInfoDescription(e.target.value)}
          /> */}
        </div>
        <div className="w-full flex flex-row min-h-[45px] gap-[20px] mt-auto">
          <button
            className="w-1/2 rounded-[8px] border-solid border border-textTertiary text-textPrimary hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="w-1/2 rounded-[8px] bg-textBlue text-white hover:bg-[#6E9EFF]" onClick={addInfo}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionModal;
