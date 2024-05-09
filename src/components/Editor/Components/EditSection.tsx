import React, { useEffect, useState } from "react";
import { List, Reset, TrashCan } from "@carbon/icons-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { useSection } from "context/SectionContext";
import { SectionsType } from "../types";

interface Props extends SectionsType {
  onDeleteSection: (e: React.MouseEvent<HTMLElement, MouseEvent>, section: SectionsType) => void;
  onResetSection: (e: React.MouseEvent<HTMLElement, MouseEvent>, section: SectionsType) => void;
}

const EditSection = ({ id, title, markdown, onDeleteSection, onResetSection }: Props) => {
  const { state, actions } = useSection();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const onClickSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, section: SectionsType) => {
    e.stopPropagation();
    actions.setEditorMarkDown(prev => ({ ...prev, ...section }));
    actions.setFocusSection(id);
  };

  useEffect(() => {
    localStorage.setItem("current-section", JSON.stringify(state.editorMarkDown));
  }, [state.editorMarkDown]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      onClick={e => onClickSection(e, { id, title, markdown })}
      className={clsx(
        "w-full h-[45px] py-[8px] px-[12px]",
        "flex flex-row gap-[10px] items-center",
        "rounded-[8px] border-solid border bg-white border-[#F1F3F5] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)]",
        "cursor-pointer",
        {
          "ring-2 ring-textBlue": state.focusSection === id,
        },
      )}
    >
      <List {...listeners} size={25} className="fill-textSecondary min-w-[25px]" />
      <p className="text-textPrimary mb-0 truncate">{title}</p>
      {state.focusSection === id && (
        <div className="flex flex-row gap-[10px] ml-auto">
          <button onClick={e => onResetSection(e, { id, title, markdown })}>
            <Reset size={20} className="fill-[#ADB5BD]" />
          </button>
          <button onClick={e => onDeleteSection(e, { id, title, markdown })}>
            <TrashCan size={20} className="fill-textPrimary" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditSection;
