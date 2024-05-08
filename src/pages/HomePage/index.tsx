import AiGenerator from "components/Editor/Components/AiGenerator";
import React from "react";
import { RoutePath, useRouter } from "../routing";

interface ButtonProps {
  url: RoutePath;
  color: string;
  backgroundColor: string;
  description: string;
  hover: string;
  dark: string;
  testId: string;
}

function HomePage() {
  return (
    <div className="dark:bg-gradient-dark w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-[20px]">
      <div className="flex-Center flex-col" data-testid="home">
        <img alt="로고" src="/images/rm-logo.png" width="150" height="150" data-testid="logo" />
        <span className="text-textPrimary  dark:text-textWhite text-3xl md:text-6xl sm:text-5xl font-bold line-lg" data-testid="title">
          README-MONSTER
        </span>
        <p
          className="max-w-md mx-auto mt-3 text-textSecondary display-contents sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          data-testid="description"
        >
          <span>당신의 프로젝트 README를</span>
          <span>자동으로 만들 수 있는 가장 빠르고 쉬운 방법</span>
        </p>
      </div>
      <div className="flex flex-row gap-[20px]" data-testid="button">
        <Button
          url="/editor"
          color="text-white"
          backgroundColor="bg-textBlue"
          dark="bg-darkSecondary"
          hover="hover:bg-textBlueHover"
          description="시작하기"
          testId="firstButton"
        />
        <Button
          url="/signup"
          color="text-textPrimary"
          backgroundColor="bg-gray-200"
          dark="bg-gray-200"
          hover="hover:bg-textgreyHover"
          description="더 알아보기"
          testId="secondButton"
        />
        <AiGenerator />
      </div>
    </div>
  );
}

export default HomePage;

export function Button({ url, color, backgroundColor, description, hover, dark, testId }: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(url);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="inline-flex rounded-md shadow">
        <div
          className={`
          inline-flex items-center px-4 py-2 
          font-medium text-xl 
          ${backgroundColor} 
          ${hover} 
          border-transparent rounded-lg 
          dark:${dark}
          ${color} 
          w-[250px] h-[54px] 
          justify-center
          cursor-pointer
          `}
          onClick={handleClick}
          data-testid={testId}
        >
          {description}
        </div>
      </span>
    </div>
  );
}
