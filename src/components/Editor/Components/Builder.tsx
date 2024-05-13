import React, { useEffect, useState } from "react";
import SelectSections from "./SelectSections";
import EditSections from "./EditSections";
import { app, db } from "../../../firebaseApp";
import { getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseStore } from "../types";

const Builder = () => {
  const auth = getAuth(app).currentUser;
  const [userData, setUserData] = useState<FirebaseStore | undefined>(undefined);

  const handleGetUserInfo = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "userInfo"));

      querySnapshot.forEach(doc => {
        if (doc.data().email === auth?.email) {
          setUserData({
            id: doc.id,
            sections: doc.data().sections,
          });
        }
      });
    } catch (err) {
      alert("회원정보를 가져오는데 실패하였습니다.");
    }
  };

  useEffect(() => {
    if (auth) {
      handleGetUserInfo();
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-[20px]">
      <div className="w-full h-auto">
        <EditSections userData={userData} auth={auth} />
      </div>
      <div className="w-full h-auto">
        <SelectSections />
      </div>
    </div>
  );
};

export default Builder;
