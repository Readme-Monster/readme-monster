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
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useSection } from "context/SectionContext";
import { KeyNameType, SectionsType } from "../types";

const EditSections = ({ keyName }: KeyNameType) => {
  const { sections, addSection } = useSection();
  const [section, setSection] = useState<SectionsType[]>([]);

  const getIndex = (id: number) => section.findIndex(el => el.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    setSection(section => {
      const oldIndex = getIndex(active.id as number);
      const newIndex = getIndex(over?.id as number);

      return arrayMove(section, oldIndex, newIndex);
    });
  };

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDeleteSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, targetId: number) => {
    e.stopPropagation();
    setSection(prev => prev.filter(el => el.id !== targetId));
  };

  const onResetSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, targetId: number) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const sectionsList = JSON.parse(localStorage.getItem(`${keyName}`) || "[]");
    if (sectionsList.length > 0) {
      setSection(sectionsList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`${keyName}`, JSON.stringify(sections));
    // const sectionsList = JSON.parse(localStorage.getItem(`${keyName}`) || "[]");
    // const markdownList = sectionsList.map((el: SectionsType) => el.markdown).join("");
    // addSection(markdownList);
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
            {/* {section.map(section => (
              <EditSection
                key={section.id}
                title={section.title}
                id={section.id}
                markdown={section.markdown}
                onDeleteSection={onDeleteSection}
              />
            ))} */}
            {sections.map((section, index) => (
              <EditSection
                key={index}
                title={section}
                id={index}
                // id={section.id}
                // markdown={section.markdown}
                // onDeleteSection={onDeleteSection}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default EditSections;
