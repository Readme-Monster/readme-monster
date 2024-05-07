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
import { KeyType, SectionsType } from "../types";

const EditSections = ({ type }: KeyType) => {
  const { actions } = useSection();
  const [sections, setSections] = useState<SectionsType[]>([]);
  const [focusSection, setFocusSection] = useState<number | null>(null);

  const getIndex = (id: number) => sections.findIndex(el => el.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    setSections(sections => {
      const oldIndex = getIndex(active.id as number);
      const newIndex = getIndex(over?.id as number);

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

  const onDeleteSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, targetId: number) => {
    e.stopPropagation();
    setSections(prev => prev.filter(el => el.id !== targetId));
    if (sections.length > 1) {
      let index;
      const deleteSection = sections.findIndex(el => el.id === targetId);
      if (deleteSection === 0) {
        index = 1;
      } else {
        index = deleteSection - 1;
      }
      actions.setEditorMarkDown(sections[index]);
      setFocusSection(sections[index].id);
    }
  };

  const onResetSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, targetId: number) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const sectionsList = JSON.parse(localStorage.getItem(`${type}-sections-list`) || "[]");
    if (sectionsList.length > 0) {
      setSections(sectionsList);
      actions.setEditorMarkDown(sectionsList[0]);
      setFocusSection(sectionsList[0]?.id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`${type}-sections-list`, JSON.stringify(sections));
    const sectionsList = JSON.parse(localStorage.getItem(`${type}-sections-list`) || "[]");
    actions.setMarkDowns(sectionsList);
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
              <EditSection
                key={section.id}
                title={section.title}
                id={section.id}
                markdown={section.markdown}
                focusSection={focusSection!}
                setFocusSection={setFocusSection}
                onDeleteSection={onDeleteSection}
                onResetSection={onResetSection}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default EditSections;
