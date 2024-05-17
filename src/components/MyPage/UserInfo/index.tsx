import React, { useState, useEffect } from "react";
import { UserInfoProps } from "./types";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "pages/routing";
import { app, db } from "../../../firebaseApp";
import { deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Edit } from "@carbon/icons-react";

const UserInfo = ({ userInfo }: { userInfo: UserInfoProps }) => {
  const auth = getAuth(app);
  const router = useRouter();
  const storage = getStorage(app);
  const [userImg, setUserImg] = useState<string>();

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

  const handleImageChange = async (event: any) => {
    const selectedImage = event.target.files[0];

    if (selectedImage === null) return;

    const imageRef = ref(storage, `images/${auth.currentUser?.uid}`);

    uploadBytes(imageRef, selectedImage).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        setUserImg(url);
      });
    });
  };

  const handleGetUserImage = async () => {
    const imageRef = ref(storage, `images/${auth.currentUser?.uid}`);

    try {
      const imageURL = await getDownloadURL(imageRef);
      if (imageURL) setUserImg(imageURL);
    } catch (e: any) {
      console.log(e);
      setUserImg("https://www.ailee-shopperhouse.com/images/avatars/1.png");
    }
  };

  useEffect(() => {
    handleGetUserImage();
  }, []);

  return (
    <div className="w-full h-full p-[10px]">
      <div className="w-full h-full flex flex-row items-center gap-[10px] mb-[10px]">
        <div className="w-full flex flex-col">
          <p className="text-textBlue font-semibold mb-0 text-xl">{userInfo.name}</p>
          <p className="text-textPrimary dark:text-textWhite mb-0 text-lg">{userInfo.email}</p>
          <p className="text-textSecondary dark:text-textWhite mb-0">
            저장 섹션 수 : <b className="text-textPrimary dark:text-textWhite">{userInfo.sections.length ?? 0}</b>
          </p>
        </div>
        <div className="max-w-[90px] h-[90px] relative">
          {userImg && (
            <label htmlFor="imageInput" className="cursor-pointer">
              <img className="min-w-[90px] min-h-[90px] bg-slate-400 rounded-full" src={userImg} alt="Profile" />
            </label>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageInput" />
          <div
            onClick={handleImageChange}
            className="w-[25px] h-[25px] bg-white rounded-full border flex flex-Center absolute right-3 bottom-[-1px] cursor-pointer"
          >
            <Edit size={12} />
          </div>
        </div>
      </div>
      <button
        className="w-full h-12 border-1 border-[#FF4A50] hover:border-gray-500 text-center font-semibold text-[#FF4A50] hover:text-gray-500 rounded-[8px] mt-[20px]"
        onClick={handleDeleteUser}
      >
        탈퇴하기
      </button>
    </div>
  );
};

export default UserInfo;
