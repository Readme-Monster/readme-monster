import React, { ChangeEvent, useState, useEffect } from "react";

import Input from "../Input";
import { UserInfoProps } from "./types";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "pages/routing";
import { app, db } from "../../../firebaseApp";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
    docId: "",
  });

  const auth = getAuth(app);
  const router = useRouter();

  const handleGetUserInfo = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "userInfo"));

      querySnapshot.forEach(doc => {
        const { name, email } = doc.data();
        setUserInfo(prev => ({
          ...prev,
          name,
          email,
          docId: doc.id,
        }));
      });
    } catch (e: any) {
      toast.error("오류가 발생했습니다");
    }
  };

  const handleUpdateUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserInfo((prev: UserInfoProps) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDeleteUser = async () => {
    try {
      await deleteDoc(doc(db, "userInfo", userInfo.docId));
      await signOut(auth);

      toast.success("회원탈퇴를 완료하였습니다.");

      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return (
    <div className="w-1/2 h-full flex-Center flex-col gap-2 border-1 p-2 border-cyan-600">
      <img className="w-28 h-28 bg-slate-400 rounded-full" src="" />
      <Input value={userInfo.name} placeholder="이름" id="name" onChange={handleUpdateUserInfo} disabled={true} />
      <Input value={userInfo.email} placeholder="이메일" id="email" onChange={handleUpdateUserInfo} disabled={true} />
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
