import { SectionsType } from "components/Editor/types";
import React, { createContext, useContext, useState } from "react";
import { sections } from "data";

interface SectionContextType {
  state: {
    selectSections: SectionsType[];
    editSections: SectionsType[];
    editorMarkDown: SectionsType;
    focusSection: number | undefined;
  };
  actions: {
    setSelectSections: React.Dispatch<React.SetStateAction<SectionsType[]>>;
    setEditSections: React.Dispatch<React.SetStateAction<SectionsType[]>>;
    setEditorMarkDown: React.Dispatch<React.SetStateAction<SectionsType>>;
    setFocusSection: React.Dispatch<React.SetStateAction<number | undefined>>;
  };
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
    title: "",
    markdown: "# Welcome To README-MONSTER",
  });
  const [focusSection, setFocusSection] = useState<number | undefined>(undefined);

  const value = {
    state: { selectSections, editSections, editorMarkDown, focusSection },
    actions: { setSelectSections, setEditSections, setEditorMarkDown, setFocusSection },
  };

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
};
