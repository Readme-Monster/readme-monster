import React from "react";
import { RoutePath, useRouter } from "./routing";

interface ButtonProps {
  url: RoutePath;
  color: string;
  backgroundColor: string;
  description: string;
  hover: string;
  testId: string;
}

function HomePage() {
  return (
    <div className="w-full h-[calc(100vh-48px)] flex flex-col items-center justify-center">
      <div className="flex-Center flex-col" data-testid="home">
        <img alt="로고" src="/img/logo.png" width="140" height="140" data-testid="logo" />
        <span className="text-textPrimary  text-3xl md:text-6xl sm:text-5xl font-bold line-lg" data-testid="title">
          README-MONSTER
        </span>
        <p
          className="max-w-md mx-auto mt-3 text-textSecondary text-gray-500 display-contents sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          data-testid="description"
        >
          <span>당신의 프로젝트 README를</span>
          <span>자동으로 만들 수 있는 가장 빠르고 쉬운 방법</span>
        </p>
      </div>
      <div className="flex justify-center mt-6" data-testid="button">
        <Button
          url="/editor"
          color="text-white"
          backgroundColor="bg-textBlue"
          hover="hover:bg-textBlueHover"
          description="시작하기"
          testId="firstButton"
        />
        <Button
          url="/signup"
          color="text-textPrimary"
          backgroundColor="bg-gray-200"
          hover="hover:bg-textgreyHover"
          description="더 알아보기"
          testId="secondButton"
        />
      </div>
    </div>
  );
}

export default HomePage;

export function Button({ url, color, backgroundColor, description, hover, testId }: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(url);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="inline-flex rounded-md shadow">
        <a
          className={`
          inline-flex items-center px-4 py-2 
          font-medium text-xl 
          ${backgroundColor} 
          ${hover} 
          border border-transparent rounded-lg 
          ${color} 
          w-[250px] h-[54px] 
          justify-center`}
          onClick={handleClick}
          data-testid={testId}
        >
          {description}
        </a>
      </span>
    </div>
  );
}
