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
    <div className="w-full h-[100%]  overflow-scroll hide-scrollbar">
      {newUserSectionList?.length > 0 ? (
        newUserSectionList?.map((userData, i) => {
          const { dateType, data } = userData;
          return (
            <div key={i} className="w-full max-h-[100] flex flex-col relative gap-[10px]">
              <div className="left-0 px-2 py-1 font-semibold dark:text-slate-50">{dateType}</div>
              {data.map(list => {
                return (
                  <div
                    key={list.id}
                    className="
                    w-full h-auto
                     flex flex-row items-center justify-between
                     bg-gray-50 dark:bg-slate-300 
                    hover:bg-slate-100
                     cursor-pointer z-0
                     rounded-[8px] p-[20px]
                     "
                    onClick={() => handleOnClick(list.id)}
                  >
                    <div>
                      <p className="text-textSecondary">{handleConvertDate(list.saveDate?.seconds)}</p>
                      <p className="text-lg text-textPrimary dark:text-textPrimary truncate mb-0" data-testid="title">
                        {list.editSections[0].title}
                      </p>
                    </div>
                    <div className=" text-xs text-white" onClick={event => handleDeleteClick(event, list.id)}>
                      <TrashCan size={22} className="fill-textPrimary" />
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
