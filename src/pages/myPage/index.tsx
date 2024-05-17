import React, { useEffect, useState } from "react";
import UserInfo from "../../components/MyPage/UserInfo";
import UserPreviousList from "../../components/MyPage/UserPrevious";
import { toast } from "react-toastify";
import { app, db } from "../../firebaseApp";
import { UserInfoProps } from "components/MyPage/UserInfo/types";
import { collection, getDocs } from "firebase/firestore";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name: "",
    email: "",
    docId: "",
    image: "",
    sections: [],
  });

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
        const { name, email, sections, image } = doc.data();
        if (email === userEmail) {
          setUserInfo(prev => ({
            ...prev,
            name,
            email,
            image,
            docId: doc.id,
            sections,
          }));
        }
      });
    } catch (e: any) {
      toast.error("오류가 발생했습니다");
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return (
    <section className="w-full h-[calc(100%_-_70px)] flex flex-Center">
      <div className="w-[650px] max-h-full p-[24px]">
        <h1 className="text-center text-xl dark:text-textWhite font-bold mb-[30px]">마이페이지</h1>
        <div className="w-full flex flex-col items-center justify-center">
          <UserInfo userInfo={userInfo} />
        </div>
        <div className="w-full max-h-full my-[30px]">
          <UserPreviousList
            userInfo={userInfo}
            userSectionList={userInfo.sections}
            handleGetUserInfo={handleGetUserInfo}
          />
        </div>
      </div>
    </section>
  );
};

export default MyPage;
