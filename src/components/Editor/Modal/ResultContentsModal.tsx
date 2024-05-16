// ResultContentsModal.tsx
import React, { forwardRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResultContentsModal = forwardRef<HTMLDivElement, ModalProps>(({ isOpen, onClose }, ref) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-75">
      <div className="bg-white w-1/2 p-4 h-[80%] flex flex-col justify-around rounded-md">
        <div ref={ref} className="p-4 h-[90%] overflow-scroll bg-gray-100 rounded-md" />
        <button onClick={onClose} className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          닫기
        </button>
      </div>
    </div>
  );
});

ResultContentsModal.displayName = "ResultContentsModal";

export default ResultContentsModal;
