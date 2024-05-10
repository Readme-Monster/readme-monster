import React from "react";

const CHATLISTDATA = [
  { id: 1, title: "리드미를 써줘", data: "2024-05-10" },
  { id: 2, title: "borderColor가 원하는 값으로 설정해줘", data: "2024-05-05" },
  { id: 3, title: "알고리즘이 중요해?", data: "2024-04-29" },
  { id: 4, title: "자료구조에 대해서 알려줘", data: "2024-04-27" },
  { id: 5, title: "bfs dfs 차이점", data: "2024-04-25" },
  { id: 6, title: "스택은 뭐야", data: "2024-04-18" },
  { id: 7, title: "꿀이랑 허니에 대해 성분 비교 좀", data: "2024-04-13" },
  { id: 8, title: "프로젝트에 대해서 간략하게 알려줘", data: "2024-03-30" },
  { id: 9, title: "해당 프로젝트 설치를 어떻게 해", data: "2024-03-27" },
  { id: 10, title: "테스트 코드를 좀 만들어줘", data: "2024-03-29" },
];

const UserPreviousList = () => {
  return (
    <div className="w-full h-full flex flex-wrap gap-2 p-2 ">
      {CHATLISTDATA.map(data => {
        return (
          <div
            key={data.id}
            className="relative w-28 h-28 bg-[#BBDDFF] hover:scale-110 transition-transform ease-in-out duration-500 cursor-pointer"
            style={{ backgroundImage: `url(${"/images/rm-logo.png"})`, backgroundSize: "cover" }}
          >
            <div className="absolute top-1 right-0 px-2 py-1 text-xs text-white bg-gray-600 rounded-full">
              {data.data}
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-2 text-center bg-gray-800 text-white overflow-hidden whitespace-nowrap">
              <div className="truncate font-semibold text-sm">{data.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserPreviousList;
