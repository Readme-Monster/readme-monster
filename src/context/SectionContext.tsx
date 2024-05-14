import { SectionsType } from "components/Editor/types";
import React, { createContext, useContext, useMemo, useState } from "react";
import { sections } from "data";

interface SectionContextType {
  state: {
    selectSections: SectionsType[];
    editSections: SectionsType[];
    editorMarkDown: SectionsType;
    focusSection: number | undefined;
    isDataChanged: boolean;
  };
  actions: {
    setSelectSections: React.Dispatch<React.SetStateAction<SectionsType[]>>;
    setEditSections: React.Dispatch<React.SetStateAction<SectionsType[]>>;
    setEditorMarkDown: React.Dispatch<React.SetStateAction<SectionsType>>;
    setFocusSection: React.Dispatch<React.SetStateAction<number | undefined>>;
    setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
  };
  resetContextData: () => void;
}

interface SectionContextProviderProps {
  children: React.ReactNode;
}

const SectionContext = createContext<SectionContextType | null>(null);

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};

export const SectionProvider = ({ children }: SectionContextProviderProps) => {
  const [selectSections, setSelectSections] = useState<SectionsType[]>(sections);
  const [editSections, setEditSections] = useState<SectionsType[]>([]);
  const [editorMarkDown, setEditorMarkDown] = useState<SectionsType>({
    id: 0,
    name: "",
    title: "",
    markdown: "",
  });
  const [focusSection, setFocusSection] = useState<number | undefined>(undefined);
  const [isDataChanged, setDataChanged] = useState<boolean>(false);

  const value = useMemo(() => {
    return {
      state: { selectSections, editSections, editorMarkDown, focusSection, isDataChanged },
      actions: { setSelectSections, setEditSections, setEditorMarkDown, setFocusSection, setDataChanged },
    };
  }, [selectSections, editSections, editorMarkDown, focusSection, isDataChanged]);

  const resetContextData = () => {
    setSelectSections(sections);
    setEditSections([]);
    setEditorMarkDown({ id: 0, name: "", title: "", markdown: "" });
    setFocusSection(undefined);
    setDataChanged(false);
  };

  return (
    <SectionContext.Provider value={{ state: value.state, actions: value.actions, resetContextData }}>
      {children}
    </SectionContext.Provider>
  );
};
