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
    <div className="w-96 flex-Center flex-col gap-2">
      <img className="w-28 h-28 bg-slate-400 rounded-full" src="" />
      <Input value={userInfo.name} placeholder="이름" id="name" onChange={handleUpdateUserInfo} />
      <Input value={userInfo.id} placeholder="아이디" id="id" onChange={handleUpdateUserInfo} />
      <Input value={userInfo.email} placeholder="이메일" id="email" onChange={handleUpdateUserInfo} />
      <Input value={userInfo.password} placeholder="패스워드" id="password" onChange={handleUpdateUserInfo} />
      <Input
        value={userInfo.passwordCheck}
        placeholder="패스워드 확인"
        id="passwordCheck"
        onChange={handleUpdateUserInfo}
      />
      <button className="w-full h-10 bg-[#FF4A50] text-center text-cyan-50">탈퇴하기</button>
    </div>
  );
};

export default UserInfo;
