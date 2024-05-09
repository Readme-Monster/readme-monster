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
import { SectionsType } from "../types";
import { sections as originData } from "data";

const EditSections = () => {
  const { state, actions } = useSection();
  const [sections, setSections] = useState<SectionsType[]>(() => {
    const localData = JSON.parse(localStorage.getItem("edit-sections-list") || "[]");
    return localData.length > 0 ? localData : state.editSections;
  });

  const getIndex = (id: number) => sections.findIndex(el => el.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    setSections(sections => {
      const oldIndex = getIndex(active.id as number);
      const newIndex = getIndex(over?.id as number);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      actions.setEditSections(newSections);
      return newSections;
    });
  };

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDeleteSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, section: SectionsType) => {
    e.stopPropagation();
    setSections(prev => prev.filter(el => el.id !== section.id));
    actions.setSelectSections(prev => [...prev, section].sort((a, b) => a.id - b.id));
    actions.setEditSections(prev => prev.filter(el => el.id !== section.id));
    if (sections.length > 1) {
      let index;
      const deleteSection = sections.findIndex(el => el.id === section.id);
      if (deleteSection === 0) {
        index = 1;
      } else {
        index = deleteSection - 1;
      }
      actions.setEditorMarkDown(sections[index]);
      actions.setFocusSection(sections[index].id);
    } else {
      actions.setFocusSection(undefined);
      localStorage.removeItem("current-section");
    }
  };

  const onResetSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, section: SectionsType) => {
    e.stopPropagation();
    let originalMarkdown: string;
    if (originData.some(el => el.id === section.id)) {
      originalMarkdown = originData.find(s => s.id === section.id)?.markdown as string;
    } else {
      const sectionTitle = section.title;
      originalMarkdown = `## ${sectionTitle}

`;
    }
    actions.setEditorMarkDown(prev => ({ ...prev, markdown: `${originalMarkdown}` }));
    actions.setEditSections(prev =>
      prev.map(s => {
        if (s.id === section.id) {
          return { ...s, markdown: `${originalMarkdown}` };
        } else {
          return s;
        }
      }),
    );
  };

  useEffect(() => {
    if (sections.length > 0) {
      actions.setEditorMarkDown(sections[0]);
      actions.setFocusSection(sections[0]?.id);
    }
    actions.setEditSections(sections);
  }, []);

  useEffect(() => {
    localStorage.setItem("edit-sections-list", JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    if (state.editSections.length > 0) {
      setSections(state.editSections);
    }
  }, [state.editSections]);

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
