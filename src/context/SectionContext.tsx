import { SectionsType } from "components/Editor/types";
import React, { createContext, useContext, useState } from "react";

interface SectionContextType {
  state: { markDowns: SectionsType[]; editorMarkDown: SectionsType };
  actions: {
    setMarkDowns: React.Dispatch<React.SetStateAction<SectionsType[]>>;
    setEditorMarkDown: React.Dispatch<React.SetStateAction<SectionsType>>;
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
  const [markDowns, setMarkDowns] = useState<SectionsType[]>([]);
  const [editorMarkDown, setEditorMarkDown] = useState<SectionsType>({
    id: 0,
    title: "",
    markdown: "# Welcome To README-MONSTER",
  });

  const value = {
    state: { markDowns, editorMarkDown },
    actions: { setMarkDowns, setEditorMarkDown },
  };

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
};
