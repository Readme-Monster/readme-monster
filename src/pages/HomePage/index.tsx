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
    <div className="bg-gradient-test dark:bg-gradient-dark w-full h-[calc(100vh-80px)]  mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-xl text-center" data-testid="home">
        <h1 className="text-3xl font-extrabold sm:text-5xl text-textPrimary  dark:text-textWhite" data-testid="title">
          README-MONSTER
          <br />
          <strong className="font-extrabold text-textBlue sm:block">Builder & Generator</strong>
        </h1>
        <p className="mt-4 sm:text-xl/relaxed text-textSecondary" data-testid="description">
          사용자가 직관적인 인터페이스를 통해 README 파일을 쉽게 구성할 수 있게 도와주고, 생성형 AI를 이용해 적절한
          README 구성을 추천합니다
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4" data-testid="button">
          <Button
            url="/editor"
            color="text-white"
            backgroundColor="bg-textBlue"
            dark="bg-darkPrimary"
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
        </div>
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
    <div
      className={`
        block w-full rounded shadow 
        inline-flex items-center px-12 py-3 
        ${backgroundColor} dark:${dark}
        ${color} ${hover} 
        font-medium text-sm 
        cursor-pointer
        focus:outline-none focus:ring sm:w-auto
        w-[270px] h-[54px] 
        justify-center
        
      `}
      onClick={handleClick}
      data-testid={testId}
    >
      {description}
    </div>
  );
}
