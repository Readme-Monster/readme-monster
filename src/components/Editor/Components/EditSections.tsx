import React, { useEffect, useState } from "react";
import EditSection from "./EditSection";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface Props {
  id: number;
  title: string | undefined;
}

const EditSections = () => {
  const [sections, setSections] = useState<Props[]>([]);

  const getIndex = (id: number) => sections.findIndex(el => el.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setSections(sections => {
      const oldIndex = getIndex(active.id);
      const newIndex = getIndex(over.id);

      return arrayMove(sections, oldIndex, newIndex);
    });
  };

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const prevSectionsList = JSON.parse(localStorage.getItem("builder-sections-list") || "[]");
    if (prevSectionsList.length > 0) {
      setSections(prevSectionsList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("builder-sections-list", JSON.stringify(sections));
  }, [sections]);

  return (
    <div className="flex flex-col gap-[10px] px-[10px]">
      <div className="flex-Center flex-row justify-between min-h-[30px]">
        <p className="text-textPrimary ml-[5px] mb-0 text-sm">Edit Section</p>
      </div>
      <div className="flex flex-col gap-[10px] h-full">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={sections} strategy={verticalListSortingStrategy}>
            {sections.map(section => (
              <EditSection key={section.id} title={section.title} id={section.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default EditSections;
