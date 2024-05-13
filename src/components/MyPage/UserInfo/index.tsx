import React, { useState, useEffect } from "react";
import { UserInfoProps } from "./types";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "pages/routing";
import { app, db } from "../../../firebaseApp";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

const UserInfo = ({ userInfo }: { userInfo: UserInfoProps }) => {
  const auth = getAuth(app);
  const router = useRouter();

  const handleDeleteUser = async () => {
    if (confirm("탈퇴하시겠습니까?")) {
      try {
        await auth.currentUser?.delete();
        await deleteDoc(doc(db, "userInfo", userInfo.docId));
        await signOut(auth);

        toast.success("회원탈퇴를 완료하였습니다.");

        router.push("/");
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2 className="text-textBlue font-semibold">마이페이지</h2>
      <div className="flex items-center w-full">
        <div className="w-4/5">
          <img
            className="flex w-28 h-28 bg-slate-400 rounded-full"
            src="https://www.ailee-shopperhouse.com/images/avatars/1.png"
          />
        </div>
        <div className="w-1/5">
          <div className="flex flex-row justify-between font-semibold">
            <div className="flex flex-col items-center dark:text-textWhite">
              <h5>생성(개수)</h5>
              <p>{userInfo.sections.length ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col p-2">
        <h4 className="text-textBlue font-semibold">{userInfo.name}</h4>
        <h5 className="text-textPrimary dark:text-textWhite">{userInfo.email}</h5>
      </div>

      <button
        className="w-full h-16 border-1 border-[#FF4A50] hover:border-gray-500 text-center font-semibold text-[#FF4A50] hover:text-gray-500"
        onClick={handleDeleteUser}
      >
        탈퇴하기
      </button>
    </>
  );
};

export default UserInfo;
