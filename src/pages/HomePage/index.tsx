import useMediaQuery from "components/Common/useMediaQuery";
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
  const matches = useMediaQuery("mobile");

  return (
    <div className="flex-Center bg-gradient-test dark:bg-gradient-dark w-full h-[calc(100vh_-_70px)] p-[24px]">
      <div className="mx-auto max-w-auto text-center" data-testid="home">
        <h1 className="sm:text-5xl text-4xl font-extrabold text-textPrimary dark:text-textWhite" data-testid="title">
          README-MONSTER
        </h1>
        <h2 className="sm:text-[40px] text-3xl mb-0 font-extrabold text-textBlue sm:block">Builder & Generator</h2>
        <p className="w-full mt-4 sm:text-xl text-textWhite" data-testid="description">
          사용자의 직관적인 인터페이스를 통해 {matches && <br />} README 파일을 쉽게 구성할 수 있게 도와주고
          <br />
          생성형 AI를 이용해 적절한 README 구성을 추천합니다
        </p>
        <div className="mt-8 flex flex-row justify-center gap-4" data-testid="button">
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
            backgroundColor="bg-gray-100"
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
        w-full min-w-[180px] h-[50px] rounded-[8px]
        drop-shadow-[0_1px_1px_rgba(173,181,189,0.25)]
        flex items-center
        ${backgroundColor} dark:${dark}
        ${color} ${hover} 
        font-medium
        cursor-pointer
        focus:outline-none focus:ring sm:w-auto
        justify-center
      `}
      onClick={handleClick}
      data-testid={testId}
    >
      {description}
    </div>
  );
}
