import React from "react";
import UserInfo from "../../components/MyPage/UserInfo";
import UserPreviousList from "../../components/MyPage/UserPrevious";

const MyPage = () => {
  return (
    <section className="w-full flex justify-center ">
      <div className="flex flex-col items-center justify-center gap-3 p-10 w-2/5 ">
        <UserInfo />
        <UserPreviousList />
      </div>
    </section>
  );
};

export default MyPage;
