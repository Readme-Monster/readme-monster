import React, { useState, useEffect } from "react";
import { UserInfoProps } from "./types";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "pages/routing";
import { app, db } from "../../../firebaseApp";
import { deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    const imageURL = await getDownloadURL(imageRef);
    if (imageURL) setUserImg(imageURL ?? "https://www.ailee-shopperhouse.com/images/avatars/1.png");
  };

  useEffect(() => {
    handleGetUserImage();
  }, []);

  return (
    <>
      <h2 className="text-textBlue font-semibold">마이페이지</h2>
      <div className="flex flex-col md:flex-row items-center w-full">
        <div className="w-full md:w-4/5 flex flex-col md:flex-row mb-4 md:mb-0">
          {userImg && (
            <label htmlFor="imageInput" className="cursor-pointer">
              <img className="w-28 h-28 md:w-28 md:h-auto bg-slate-400 rounded-full" src={userImg} alt="Profile" />
            </label>
          )}

          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageInput" />
        </div>
        <div className="w-full lg:w-1/5">
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
        className="w-full h-12 border-1 border-[#FF4A50] hover:border-gray-500 text-center font-semibold text-[#FF4A50] hover:text-gray-500"
        onClick={handleDeleteUser}
      >
        탈퇴하기
      </button>
    </>
  );
};

export default UserInfo;
