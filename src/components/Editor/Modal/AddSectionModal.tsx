import { useSection } from "context/SectionContext";
import React, { useEffect, useRef, useState } from "react";
import { SectionsType } from "../types";
interface Props {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutSideClick: (e: any) => void;
  onClose: () => void;
  openModal: boolean;
}

const AddSectionModal = ({ modalRef, modalOutSideClick, onClose, openModal }: Props) => {
  const { state, actions } = useSection();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (openModal) {
      inputRef.current?.focus();
    }
  }, [openModal]);

  const onCreateSection = () => {
    const createId = state.selectSections.length + state.editSections.length + 1;
    const newValue: SectionsType = {
      id: createId,
      name: title,
      title: title,
      markdown: `## ${title}

`,
    };
    actions.setEditSections(prev => [...prev, newValue]);
    actions.setEditorMarkDown(prev => ({ ...prev, ...newValue }));
    actions.setFocusSection(createId);

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
          <p className="text-textBlue text-2xl font-bold mb-0">New Custom Section</p>
        </div>
        <div className="my-[20px]">
          <input
            onChange={e => setTitle(e.target.value)}
            ref={inputRef}
            type="text"
            className="
              w-full h-[45px] p-[10px] 
              rounded-[8px] border-solid border border-[#DEE2E6] 
              placeholder-[#ADB5BD] placeholder:text-[14px]
              focus:outline-none focus:ring-2 focus:ring-textBlue"
            placeholder="Section Title"
          />
        </div>
        <div className="w-full flex flex-row min-h-[45px] gap-[20px] mt-auto">
          <button
            className="w-1/2 rounded-[8px] border-solid border border-textTertiary text-textPrimary hover:bg-gray-50"
            onClick={onClose}
          >
            Cancle
          </button>
          <button
            className="w-1/2 rounded-[8px] bg-textBlue text-white hover:bg-[#6E9EFF]"
            onClick={onCreateSection}
            disabled={!title}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionModal;
