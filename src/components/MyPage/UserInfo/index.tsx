import { UserInfoProps } from "pages/myPage/types";
import React, { ChangeEvent, useState } from "react";
import Input from "../Input";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name: "",
    id: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const handleUpdateUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserInfo((prev: UserInfoProps) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <>
      <img className="w-28 h-28 bg-slate-400 rounded-full" src="" />
      <Input value={userInfo.name} onChange={handleUpdateUserInfo} />
      <Input value={userInfo.id} onChange={handleUpdateUserInfo} />
      <Input value={userInfo.email} onChange={handleUpdateUserInfo} />
      <Input value={userInfo.password} onChange={handleUpdateUserInfo} />
      <Input value={userInfo.passwordCheck} onChange={handleUpdateUserInfo} />
      <button className="w-1/5 h-10 bg-[#FF4A50] text-center text-cyan-50">탈퇴하기</button>
    </>
  );
};

export default UserInfo;
