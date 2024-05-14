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

      console.log(userEmail);

      querySnapshot.forEach(doc => {
        console.log(doc.data());
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
    <section className="w-full h-[calc(100vh_-_80px)] flex justify-center ">
      <div className="flex flex-col items-center justify-center gap-1 p-10 w-2/5 h-full ">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <UserInfo userInfo={userInfo} />
        </div>
        <div className="w-full h-full overflow-y-scroll hide-scrollbar">
          <UserPreviousList userSectionList={userInfo.sections} />
        </div>
      </div>
    </section>
  );
};

export default MyPage;
