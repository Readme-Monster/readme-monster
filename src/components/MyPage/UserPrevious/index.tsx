import React from "react";
import { useNavigate } from "react-router-dom";
import { UserSectionList } from "../UserInfo/types";

const UserPreviousList = ({ userSectionList }: { userSectionList: UserSectionList[] }) => {
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
    const difference = (currentDate.getTime() - savedDate.getTime()) / (1000 * 3600 * 24); // Difference in days

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

  const newUserSectionList = Object.entries(groupedData).map(([dateType, data]) => ({ dateType, data }));

  const handleOnClick = (id: number) => {
    navigate(`/editor?id=${id}`);
  };
  return (
    <div className="w-full h-full flex flex-col gap-2 pt-3 overflow-y-scroll hide-scrollbar">
      {newUserSectionList?.map((userData, i) => {
        const { dateType, data } = userData;
        return (
          <div key={i} className="w-full flex flex-col gap-2">
            <div className="left-0 px-2 py-1 text-xs font-semibold">{dateType}</div>
            {data.map(list => {
              return (
                <div
                  key={list.id}
                  className="relative w-full h-28 flex justify-center items-center bg-[#BBDDFF] hover:scale-95 overflow-visible transition-transform ease-in-out duration-500 cursor-pointer"
                  onClick={() => handleOnClick(list.id)}
                >
                  <h1
                    className="text-2xl font-extrabold sm:text-2xl text-textPrimary  dark:text-textWhite"
                    data-testid="title"
                  >
                    README-MONSTER
                  </h1>
                  <div className="absolute top-1 right-1 px-2 py-1 text-xs text-white bg-gray-600 rounded-full">
                    {handleConvertDate(list.saveDate?.seconds)}
                  </div>
                  <div className="absolute flex flex-row bottom-0 left-0 right-0 text-center bg-gray-800 text-white truncate">
                    {list.editSections.map(editList => {
                      return (
                        <div key={editList.id} className=" w-full truncate font-semibold text-sm">
                          {editList.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default UserPreviousList;
