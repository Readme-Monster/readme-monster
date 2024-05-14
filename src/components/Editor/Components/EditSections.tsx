import React, { useEffect } from "react";
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
import { FirebaseStore, SectionsType } from "../types";
import { sections as originData } from "data";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebaseApp";
import { User } from "firebase/auth";
import { useRouter } from "pages/routing";
import { Reset } from "@carbon/icons-react";

interface Props {
  editSections: SectionsType[];
  setEditSections: React.Dispatch<React.SetStateAction<SectionsType[]>>;
  userData?: FirebaseStore;
  auth: User | null;
}

const EditSections = ({ editSections, setEditSections, userData, auth }: Props) => {
  const { state, actions, resetContextData } = useSection();
  const router = useRouter();
  const getIndex = (id: number) => editSections.findIndex(el => el.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    setEditSections(sections => {
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

  const onSaveSection = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    const storeSection = {
      id: userData!.sections.length + 1,
      editSections: state.editSections,
      selectSections: state.selectSections,
      saveDate: new Date(),
    };

    try {
      await updateDoc(doc(db, "userInfo", userData?.id as string), {
        sections: arrayUnion(storeSection),
      });
      alert("저장이 완료되었습니다.");
    } catch (error) {
      alert("저장이 실패하였습니다.");
    }
  };

  const onDeleteSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, section: SectionsType) => {
    e.stopPropagation();

    actions.setSelectSections(prev => [...prev, section].sort((a, b) => a.id - b.id));
    actions.setEditSections(prev => prev.filter(el => el.id !== section.id));
    if (editSections.length > 1) {
      let index;
      const deleteSection = editSections.findIndex(el => el.id === section.id);
      if (deleteSection === 0) {
        index = 1;
      } else {
        index = deleteSection - 1;
      }
      actions.setEditorMarkDown(editSections[index]);
      actions.setFocusSection(editSections[index].id);
    } else {
      actions.setFocusSection(undefined);
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

  const onResetSectionAll = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    const confirmedMessage = window.confirm("모든 섹션이 초기화됩니다. 계속하려면 확인을 클릭하세요.");
    if (confirmedMessage) {
      resetContextData();
      router.push("/editor");
    }
  };

  useEffect(() => {
    setEditSections(state.editSections);
    actions.setDataChanged(true);
  }, [state.editSections]);

  return (
    <div className="flex flex-col gap-[10px] px-[10px]">
      <div className="flex-Center flex-row justify-between min-h-[30px] px-[5px]">
        <p className="text-textPrimary mb-0 text-sm dark:text-textWhite">Edit Section</p>
        <div className="flex flex-row gap-[15px] items-center">
          {editSections.length > 0 && auth && (
            <p onClick={onSaveSection} className="text-textBlue font-medium mb-0 text-sm cursor-pointer ">
              저장하기
            </p>
          )}
          <button onClick={e => onResetSectionAll(e)}>
            <Reset size={20} className="fill-[#ADB5BD]" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] h-full">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={editSections} strategy={verticalListSortingStrategy}>
            {editSections.map(section => (
              <EditSection
                key={section.id}
                name={section.name}
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
