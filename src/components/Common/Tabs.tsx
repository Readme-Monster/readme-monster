import React, { Children } from "react";
import clsx from "clsx";

interface TabsProps {
  children?: React.ReactNode;
  value: string | undefined;
  onClick?: (value: string | undefined) => void;
}

interface TabProps extends TabsProps {
  selectedTab?: string | undefined;
}

export const Tabs = ({ children, onClick, value }: TabsProps) => {
  return (
    <div className="w-full min-h-[30px] flex flex-row gap-[40px] mx-[5px]">
      {Children.toArray(children).map((child, idx) => (
        <Tab
          key={idx}
          selectedTab={value}
          value={(child as React.ReactElement<TabProps>).props.value}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export const Tab = ({ value, selectedTab, onClick }: TabProps) => {
  const handleClick = () => {
    onClick && onClick(value);
  };
  const boolean = value === selectedTab;

  return (
    <>
      <div onClick={handleClick} className="h-full w-auto cursor-pointer flex items-center">
        <p
          className={clsx("mb-0", {
            "text-textBlue": boolean,
            "font-semibold": boolean,
            "text-textSecondary": !boolean,
          })}
        >
          {value}
        </p>
      </div>
    </>
  );
};
