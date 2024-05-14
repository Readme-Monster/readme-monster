import React, { useEffect, useState } from "react";
import SelectSections from "./SelectSections";
import EditSections from "./EditSections";
import { app, db } from "../../../firebaseApp";
import { getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseStore, SectionsType } from "../types";
import { useSearchParams } from "react-router-dom";
import { useSection } from "context/SectionContext";

const Builder = () => {
  const auth = getAuth(app).currentUser;
  const { actions } = useSection();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [userData, setUserData] = useState<FirebaseStore | undefined>(undefined);
  const saveData = userData?.sections.find(el => el.id === +id!);
  const [editSections, setEditSections] = useState<SectionsType[]>([]);
  const [selectSections, setSelectSections] = useState<SectionsType[]>([]);

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
  }, [auth]);

  useEffect(() => {
    if (saveData) {
      actions.setEditSections(saveData.editSections);
      actions.setSelectSections(saveData.selectSections);
      actions.setEditorMarkDown(saveData.editSections[0]);
      actions.setFocusSection(saveData.editSections[0].id);
    }
  }, [userData, id]);

  return (
    <div className="w-full h-full flex flex-col gap-[20px]">
      <div className="w-full h-auto">
        <EditSections editSections={editSections} setEditSections={setEditSections} userData={userData} auth={auth} />
      </div>
      <div className="w-full h-auto">
        <SelectSections selectSections={selectSections} setSelectSections={setSelectSections} />
      </div>
    </div>
  );
};

export default Builder;
