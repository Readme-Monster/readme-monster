import React, { useState, useEffect } from "react";
import { UserInfoProps } from "./types";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "pages/routing";
import { app, db } from "../../../firebaseApp";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name: "",
    email: "",
    docId: "",
  });

  const auth = getAuth(app);
  const router = useRouter();

  const handleGetUserEmail = async () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("firebaseLocalStorageDb");

      request.onerror = function (event: any) {
        console.error("IndexedDB error:", event.target.errorCode);
      };

      request.onsuccess = function (event: any) {
        const db = event.target.result;

        const transaction = db.transaction(["firebaseLocalStorage"]);
        const objectStore = transaction.objectStore("firebaseLocalStorage");

        const getRequest = objectStore.get(`firebase:authUser:${app.options.apiKey}:app`);

        getRequest.onerror = function (event: any) {
          console.error("Error getting data:", event.target.errorCode);
        };

        getRequest.onsuccess = function (event: any) {
          const userData = event.target.result;
          if (userData) {
            const email = userData.value.email;
            resolve(email); // Resolve with email value
          } else {
            reject(new Error("User data not found"));
          }
        };
      };
    });
  };

  const handleGetUserInfo = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "userInfo"));
      const userEmail = await handleGetUserEmail();

      querySnapshot.forEach(doc => {
        console.log(doc.data());
        const { name, email } = doc.data();
        if (email === userEmail) {
          setUserInfo(prev => ({
            ...prev,
            name,
            email,
            docId: doc.id,
          }));
        }
      });
    } catch (e: any) {
      toast.error("오류가 발생했습니다");
    }
  };

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

  useEffect(() => {
    handleGetUserInfo();
  }, []);

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
              <p>66</p>
            </div>
            {/* <div className="flex flex-col items-center font-semibold">
              <h5>회원등급</h5>
              <p>VIP</p>
            </div>
            <div className="flex flex-col items-center font-semibold">
              <h5>평점</h5>
              <p>4.5</p>
            </div> */}
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
