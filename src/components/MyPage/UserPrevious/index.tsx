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
    const difference = Math.floor((currentDate.getTime() - savedDate.getTime()) / (1000 * 3600 * 24));

    console.log(difference);

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
    <div className="w-full h-full flex flex-col gap-2 pt-3 ">
      {newUserSectionList?.map((userData, i) => {
        const { dateType, data } = userData;
        return (
          <div key={i} className="w-full flex flex-col gap-2">
            <div className="left-0 px-2 py-1 text-xs font-semibold dark:text-slate-50">{dateType}</div>
            {data.map(list => {
              return (
                <div
                  key={list.id}
                  className="relative w-full h-20 flex justify-center items-center bg-gray-800 dark:bg-slate-300 hover:scale-95 overflow-visible transition-transform ease-in-out duration-500 cursor-pointer"
                  onClick={() => handleOnClick(list.id)}
                >
                  <h1
                    className="text-2xl font-extrabold sm:text-2xl text-slate-50 dark:text-textPrimary truncate"
                    data-testid="title"
                  >
                    {list.editSections[0].title}
                  </h1>
                  <div className="absolute top-1 right-1 px-2 py-1 text-xs text-white bg-gray-600 rounded-full">
                    {handleConvertDate(list.saveDate?.seconds)}
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
