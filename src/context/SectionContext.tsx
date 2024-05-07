import React, { createContext, useContext, useState } from "react";

// src/context/SectionContext.tsx
interface SectionContextType {
  sections: string[];
  addSection: (newSection: string) => void;
}

interface SectionProviderProps {
  children: React.ReactNode;
}

const SectionContext = createContext<SectionContextType | null>(null);

interface ActiveSectionContextType {
  activeContent: string;
  setActiveContent: (content: string) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null);

export const SectionProvider: React.FC<SectionProviderProps> = ({ children }) => {
  const [sections, setSections] = useState<string[]>([]);
  const addSection = (newSection: string) => {
    setSections(prevSections => [...prevSections, newSection]);
  };

  return <SectionContext.Provider value={{ sections, addSection }}>{children}</SectionContext.Provider>;
};

export const ActiveSectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeContent, setActiveContent] = useState("");

  return (
    <ActiveSectionContext.Provider value={{ activeContent, setActiveContent }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error("useActiveSection must be used within an ActiveSectionProvider");
  }
  return context;
};
