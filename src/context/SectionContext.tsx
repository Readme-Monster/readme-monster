import React, { createContext, useContext, useState } from "react";

interface SectionContextType {
  value: string;
  setValue: (value: string) => void;
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
  const [value, setValue] = useState<string>("# Welcome To README-MONSTER");

  return (
    <SectionContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
