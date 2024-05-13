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
import { FirebaseStore, SectionsType } from "../types";
import { sections as originData } from "data";
import { getAuth } from "firebase/auth";
import { app, db } from "../../../firebaseApp";
import { getDocs, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";

const EditSections = () => {
  const auth = getAuth(app);
  const { state, actions } = useSection();
  const [userData, setUserData] = useState<FirebaseStore | undefined>(undefined);
  const [sections, setSections] = useState<SectionsType[]>([]);

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

  const handleGetUserInfo = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "userInfo"));

      querySnapshot.forEach(doc => {
        if (doc.data().email === auth.currentUser?.email) {
          setUserData({
            id: doc.id,
            sections: doc.data().sections,
          });
        }
      });
    } catch (err) {
      alert("회원정보를 가져오는데 실패하였습니다.");
    }
  };

  const onSaveSection = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    const storeSection = {
      id: userData!.sections.length + 1,
      editSections: state.editSections,
      selectSections: state.selectSections,
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
    handleGetUserInfo();
  }, []);

  useEffect(() => {
    if (state.editSections.length > 0) {
      setSections(state.editSections);
    }
  }, [state.editSections]);

  return (
    <div className="flex flex-col gap-[10px] px-[10px]">
      <div className="flex-Center flex-row justify-between min-h-[30px] px-[5px]">
        <p className="text-textPrimary mb-0 text-sm dark:text-textWhite">Edit Section</p>
        {sections.length > 0 && userData && (
          <p onClick={onSaveSection} className="text-textBlue font-medium mb-0 text-sm cursor-pointer ">
            저장하기
          </p>
        )}
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
