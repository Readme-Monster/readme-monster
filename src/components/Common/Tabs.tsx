import React, { ReactNode } from "react";
import clsx from "clsx";

interface TabsProps {
  children: ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
  return <div className="w-full min-h-[30px] flex flex-row gap-[40px]">{children}</div>;
};

interface TabProps {
  children: ReactNode;
  value: string;
}

export const Tab = ({ children, value }: TabProps) => {
  return (
    <>
      <div className="h-full w-auto cursor-pointer text-textSecondary flex items-center">{children}</div>
    </>
  );
};
