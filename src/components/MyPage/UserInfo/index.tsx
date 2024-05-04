import React, { ChangeEvent, useState } from "react";
import Input from "../Input";
import { UserInfoProps } from "./types";
import { getAuth, deleteUser } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { useRouter } from "pages/routing";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name: "",
    id: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const auth = getAuth(app);
  const router = useRouter();

  console.log(auth.currentUser?.uid);
  console.log("=============");

  const handleUpdateUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserInfo((prev: UserInfoProps) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(auth.currentUser!).then(res => {
        console.log(res);
      });

      toast.success("회원탈퇴를 완료하였습니다.");
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/2 h-full flex-Center flex-col gap-2 border-1 p-2 border-cyan-600">
      <img className="w-28 h-28 bg-slate-400 rounded-full" src="" />
      <Input value={userInfo.name} placeholder="이름" id="name" onChange={handleUpdateUserInfo} />
      <Input value={userInfo.email} placeholder="이메일" id="email" onChange={handleUpdateUserInfo} />
      <Input
        value={userInfo.password}
        placeholder="패스워드"
        id="password"
        type="password"
        onChange={handleUpdateUserInfo}
      />
      <Input
        value={userInfo.passwordCheck}
        placeholder="패스워드 확인"
        id="passwordCheck"
        type="password"
        onChange={handleUpdateUserInfo}
      />
      <button className="w-full h-10 bg-[#FF4A50] text-center text-cyan-50" onClick={handleDeleteUser}>
        탈퇴하기
      </button>
    </div>
  );
};

export default UserInfo;
