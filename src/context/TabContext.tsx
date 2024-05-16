import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context state
interface TabContextType {
  selectedTab: string;
  setTab: (tabName: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState<string>("builder");

  const setTab = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return <TabContext.Provider value={{ selectedTab, setTab }}>{children}</TabContext.Provider>;
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};
