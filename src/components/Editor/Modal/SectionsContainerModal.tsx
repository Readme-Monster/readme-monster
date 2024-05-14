import React from "react";
import SectionsContainer from "../SectionsContainer";

interface Props {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutSideClick: (e: any) => void;
  onClose: () => void;
}

const SectionsContainerModal = ({ modalRef, modalOutSideClick, onClose }: Props) => {
  return (
    <div
      ref={modalRef}
      onClick={e => modalOutSideClick(e)}
      className="h-full w-full z-20 fixed left-0 top-[80px] bg-textPrimary bg-opacity-70 "
    >
      <div className="w-full h-[calc(100vh_-_80px)] max-w-[400px] p-[24px] bg-white">
        <SectionsContainer />
      </div>
    </div>
  );
};

export default SectionsContainerModal;
