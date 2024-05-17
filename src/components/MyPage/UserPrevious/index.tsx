import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoProps, UserSectionList, NewSectionList } from "../UserInfo/types";
import { TrashCan } from "@carbon/icons-react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseApp";
import { toast } from "react-toastify";
import NoData from "../NoData";

const UserPreviousList = ({
  userInfo,
  userSectionList,
  handleGetUserInfo,
}: {
  userInfo: UserInfoProps;
  userSectionList: UserSectionList[];
  handleGetUserInfo: () => void;
}) => {
  const [newUserSectionList, setNewUserSectionList] = useState<NewSectionList[]>([]);
  const navigate = useNavigate();
  const handleConvertDate = (timeStamp: number) => {
    const milliseconds = timeStamp * 1000;
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
  };

  const handleCategorizeDate = (seconds: number) => {
    const currentDate = new Date();
    const savedDate = new Date(seconds * 1000);
    const difference = Math.floor((currentDate.getTime() - savedDate.getTime()) / (1000 * 3600 * 24));

    if (difference === 0) {
      return "Today";
    } else if (difference === 1) {
      return "Yesterday";
    } else if (difference <= 7) {
      return "Previous 7 Days";
    } else if (difference <= 30) {
      return "Previous 30 Days";
    } else {
      return "More than 30 Days Ago";
    }
  };

  const handleOnClick = (id: number) => {
    navigate(`/editor?id=${id}`);
  };

  const handleDeleteClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    event.stopPropagation();

    try {
      const userInfoRef = doc(db, "userInfo", userInfo.docId);
      const userInfoSnap = await getDoc(userInfoRef);
      const userInfoData = userInfoSnap.data();
      const index = userInfoData?.sections.findIndex((section: any) => section.id === id);

      if (index !== -1 && userInfoData) {
        const updatedSections = [...userInfoData.sections.slice(0, index), ...userInfoData.sections.slice(index + 1)];
        await updateDoc(userInfoRef, { sections: updatedSections });
      }

      handleGetUserInfo();
    } catch (error) {
      toast.success("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (userSectionList) {
      userSectionList.sort((a, b) => b.saveDate.seconds - a.saveDate.seconds);

      userSectionList.forEach(user => {
        user.dateType = handleCategorizeDate(user.saveDate.seconds);
      });

      const groupedData: { [key: string]: UserSectionList[] } = {};
      userSectionList.forEach(user => {
        const dateType = user.dateType;
        if (dateType) {
          groupedData[dateType] = groupedData[dateType] || [];
          groupedData[dateType].push(user);
        }
      });
      const newList = Object.entries(groupedData).map(([dateType, data]) => ({ dateType, data }));

      setNewUserSectionList(newList);
    }
  }, [userSectionList]);

  return (
    <div className="w-full h-full flex flex-col gap-2 pt-3 ">
      {newUserSectionList?.length > 0 ? (
        newUserSectionList?.map((userData, i) => {
          const { dateType, data } = userData;
          return (
            <div key={i} className="w-full flex flex-col gap-2 relative">
              <div className="left-0 px-2 py-1 text-xs font-semibold dark:text-slate-50">{dateType}</div>
              {data.map(list => {
                return (
                  <div
                    key={list.id}
                    className="relative w-full h-20 flex justify-center items-center bg-gray-800 dark:bg-slate-300 hover:scale-95 overflow-visible transition-transform ease-in-out duration-500 cursor-pointer z-0"
                    onClick={() => handleOnClick(list.id)}
                  >
                    <h1
                      className="text-2xl font-extrabold sm:text-2xl text-slate-50 dark:text-textPrimary truncate"
                      data-testid="title"
                    >
                      {list.editSections[0].title}
                    </h1>
                    <div
                      className="absolute top-2 right-1 px-2 py-1 text-xs text-white bg-gray-600 rounded-full z-10"
                      onClick={event => handleDeleteClick(event, list.id)}
                    >
                      <TrashCan size={22} color="red" />
                    </div>
                    <div className="absolute top-2 left-1 px-2 py-1 text-xs text-white bg-gray-600 rounded-full z-40">
                      {handleConvertDate(list.saveDate?.seconds)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default UserPreviousList;
