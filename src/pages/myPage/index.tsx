import React from "react";
import UserInfo from "../../components/MyPage/UserInfo";
import UserPreviousList from "../../components/MyPage/UserPrevious";

const MyPage = () => {
  return (
    <div className="w-fullflex flex-col items-center justify-center">
      <section className="w-full">
        <div className="flex-Center gap-5  h-[calc(100vh-100px)] p-20 ">
          <UserInfo />
          <UserPreviousList />
        </div>
      </section>
    </div>
  );
};

export default MyPage;
