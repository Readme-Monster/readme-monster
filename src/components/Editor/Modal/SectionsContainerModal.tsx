import React from "react";
import SectionsContainer from "../SectionsContainer";

interface Props {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutSideClick: (e: any) => void;
}

const SectionsContainerModal = ({ modalRef, modalOutSideClick }: Props) => {
  return (
    <div
      ref={modalRef}
      onClick={e => modalOutSideClick(e)}
      className="h-full w-full z-20 fixed left-0 top-[70px] bg-textPrimary bg-opacity-70 "
    >
      <div className="w-full h-[calc(100vh_-_70px)] max-w-[400px] p-[24px] bg-white">
        <SectionsContainer />
      </div>
    </div>
  );
};

export default SectionsContainerModal;
