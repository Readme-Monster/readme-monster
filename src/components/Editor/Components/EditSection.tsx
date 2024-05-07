import React, { useState } from "react";
import { List, Reset, TrashCan } from "@carbon/icons-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

interface Props {
  id: number;
  title: string | undefined;
  // markdown: string | undefined;
  // onDeleteSection: (e: React.MouseEvent<HTMLElement, MouseEvent>, targetId: number) => void;
}

// , markdown, onDeleteSection

const EditSection = ({ id, title }: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "w-full h-[45px] py-[8px] px-[12px]",
        "flex flex-row gap-[10px] items-center",
        "rounded-[8px] border-solid border bg-white border-[#F1F3F5] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)]",
        "cursor-pointer",
        {
          "focus:outline-none focus:ring-2 focus:ring-textBlue": true,
        },
      )}
    >
      <List {...listeners} size={25} className="fill-textSecondary min-w-[25px]" />
      <p className="text-textPrimary mb-0 truncate">{title}</p>
      {hover && (
        <div className="flex flex-row gap-[10px] ml-auto">
          <button>
            <Reset size={20} className="fill-[#ADB5BD]" onClick={() => alert("rest")} />
          </button>
          {/* <button
            onClick={e => {
              onDeleteSection(e, id);
            }}
          >
            <TrashCan size={20} className="fill-textPrimary" />
          </button> */}
        </div>
      )}
    </div>
  );
};

export default EditSection;
