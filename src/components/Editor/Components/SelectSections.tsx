import React, { useRef, useState } from "react";
import { Add } from "@carbon/icons-react";
import SearchSection from "./SearchSection";
import SelectSection from "./SelectSection";
import AddSectionModal from "../Modal/AddSectionModal";

const SelectSections = () => {
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };

  const openModalAlert = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="h-full flex flex-col gap-[10px] px-[10px]">
      <div className="flex-Center flex-row justify-between min-h-[40px]">
        <p className="text-textPrimary ml-[5px] mb-0 text-sm">Select Section</p>
        <Add size={30} className="fill-textBlue cursor-pointer" onClick={openModalAlert} />
      </div>
      <div className="h-full max-h-auto flex flex-col gap-[10px]">
        <SearchSection />
        <SelectSection />
        <SelectSection />
        <SelectSection />
        <SelectSection />
        <SelectSection />
        <SelectSection />
        <SelectSection />
        <SelectSection />
        <SelectSection />
        <SelectSection />
      </div>
      {openModal && (
        <AddSectionModal
          modalRef={modalRef}
          modalOutSideClick={modalOutSideClick}
          onClose={openModalAlert}
          openModal={openModal}
        />
      )}
    </div>
  );
};

export default SelectSections;
