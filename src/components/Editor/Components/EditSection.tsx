import React, { useState } from "react";
import { List, Reset, TrashCan } from "@carbon/icons-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

interface Props {
  id: number;
  title: string | undefined;
}

const EditSection = ({ id, title }: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const onClickDiv = () => setClicked(!clicked);

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
      {...listeners}
      style={style}
      onClick={() => onClickDiv()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "w-full h-[45px] py-[8px] px-[12px]",
        "flex flex-row gap-[10px] items-center",
        "rounded-[8px] border-solid border bg-white border-[#F1F3F5] drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)]",
        "cursor-pointer",
        {
          "focus:outline-none focus:ring-2 focus:ring-textBlue": !clicked,
        },
      )}
    >
      <List size={25} className="fill-textSecondary min-w-[25px]" />
      <p className="text-textPrimary mb-0 truncate">{title}</p>
      {hover && (
        <div className="flex flex-row gap-[10px] ml-auto">
          <Reset size={20} className="fill-[#ADB5BD]" onClick={() => alert("rest")} />
          <TrashCan size={20} className="fill-textPrimary" onClick={() => alert("delete")} />
        </div>
      )}
    </div>
  );
};

export default EditSection;
