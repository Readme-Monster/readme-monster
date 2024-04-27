import UserInfo from "components/MyPage/UserInfo";
import UserPreviousList from "components/MyPage/UserPrevious";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { TabStateProps, UserInfoProps } from "./types";

const MyPage = () => {
  const [tab, setTab] = useState<TabStateProps>({
    info: true,
    previous: false,
  });

  const handleChangeTab = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as HTMLHeadingElement;

    setTab((prev: TabStateProps) => ({
      ...prev,
      [id]: !prev[id as keyof TabStateProps],
      [id === "info" ? "previous" : "info"]: false,
    }));
  };

  return (
    <div className="w-full h-[calc(100vh-48px)] flex flex-col items-center justify-center">
      <section className="w-full h-[calc(100%)]">
        {/* 컴포넌트로 뺄 예정 */}
        <div className={"w-full h-10 bg-slate-100 flex justify-start gap-3 p-2"}>
          <button
            className={tab.info ? "text-textBlue pointer-events-none" : "text-textSecondary"}
            id="info"
            onClick={handleChangeTab}
          >
            Info
          </button>
          <button
            className={tab.previous ? "text-textBlue pointer-events-none" : "text-textSecondary"}
            id="previous"
            onClick={handleChangeTab}
          >
            Previous
          </button>
        </div>

        <div className="flex-Center flex-col gap-5 h-[calc(100vh-40px)]">
          {tab.info ? (
            // 회원정보 info
            <UserInfo />
          ) : (
            // Previous
            <UserPreviousList />
          )}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
