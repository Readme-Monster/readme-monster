import React, {  ChangeEvent, MouseEvent, useState } from "react";
import { TabStateProps } from "./types";

interface UserInfoProps{
  name:string
  id:string
  email:string
  password:string
  passwordCheck:string
}

const MyPage = () => {

  const [tab, setTab] = useState<TabStateProps>({
    info:true,
    previous:false
  });

  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name:"",
    id:"",
    email:"",
    password:"",
    passwordCheck:""
  });

  const handleChangeTab = (e:MouseEvent<HTMLButtonElement>) => {
    const {id} = e.target as HTMLHeadingElement;

    setTab(prev => ({
      ...prev,
      [id]: !prev[id as keyof TabStateProps],
      [id === "info" ? "previous" : "info"]: false
    }));
  };

  const handleUpdateUserInfo = (e:ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [id]:value
    }));
  };

  return (
    <section>
      <div className={"w-full h-10 bg-slate-100 flex justify-start gap-5 p-2"} >
        <button  className={tab.info ? "text-textBlue pointer-events-none" : "text-textSecondary"} id="info" onClick={handleChangeTab}>Info</button>
        <button className={tab.previous ? "text-textBlue pointer-events-none" : "text-textSecondary"} id="previous" onClick={handleChangeTab}>Previous</button>
      </div>

      <div className="flex-Center flex-col gap-5 h-[calc(100vh-40px)]">
        {tab.info ? (
          // 회원정보 info : 컴포넌트로 뺄 예정
          <>
            <img className="w-28 h-28 bg-slate-400 rounded-full" src="" />
            <input className="w-1/5 h-10 bg-[#CCEEFF] text-center" value={userInfo.name} placeholder="이름" id="name" onChange={handleUpdateUserInfo} />
            <input className="w-1/5 h-10 bg-[#CCEEFF] text-center" value={userInfo.id} placeholder="아이디" id="id" onChange={handleUpdateUserInfo} />
            <input className="w-1/5 h-10 bg-[#CCEEFF] text-center" value={userInfo.email} placeholder="이메일" id="email" onChange={handleUpdateUserInfo}/>
            <input className="w-1/5 h-10 bg-[#CCEEFF] text-center" value={userInfo.password} placeholder="비밀번호" type="password" id="password" onChange={handleUpdateUserInfo}/>
            <input className="w-1/5 h-10 bg-[#CCEEFF] text-center" value={userInfo.passwordCheck} placeholder="비밀번호 확인" type="password" id="passwordCheck" onChange={handleUpdateUserInfo}/>
            <button className="w-1/5 h-10 bg-[#FF4A50] text-center text-cyan-50">탈퇴하기</button>
          </>
        ):(
        // Previous  : 컴포넌트로 뺄 예정
          <div className="w-3/5 grid grid-cols-5  gap-4">
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
            <div className="w-36 h-32 bg-[#BBDDFF] flex-Center hover:scale-110 transition-transform ease-in-out duration-500">ReadMe Monster</div>
          </div>
        )}



      </div>
    </section>
  );
};

export default MyPage;