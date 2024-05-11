/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import OpenAI from "openai";
import LoadingSpinner from "components/Common/LoadingSpinner/LoadingSpinner";
import { useTab } from "context/TabContext";

const AiGenerator = ({
  githubAddress,
  openAiKey,
  formList,
  techStack,
  packageManager,
  description,
}: GenerateKeyType) => {
  const githubApiToken = process.env.REACT_APP_GITHUB_API_KEY;
  const [repos, setRepos] = useState({});
  const [githubRepo, setGithubRepo] = useState([]);
  const [openAiToken, setOpenAiToken] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutRepo, setAboutRepo] = useState([]);
  const [memberList, setMemberList] = useState("");
  const [techStackList, setTechStackList] = useState("");
  const [packageManagerList, setPackageManagerList] = useState("");
  const [descriptionList, setDescriptionList] = useState("");
  const prevResponseData = useRef();
  const { setTab } = useTab();

  useEffect(() => {
    if (githubAddress) {
      setGithubRepo(githubAddress.split("/"));
    }
    if (openAiKey) {
      setOpenAiToken(openAiKey);
    }
    if (techStack) {
      setTechStackList(techStack);
    }
    if (packageManager) {
      setPackageManagerList(packageManager);
    }
    if (description) {
      setDescriptionList(description);
    }
  }, [githubAddress, openAiKey, techStack, packageManager]);

  useEffect(() => {
    if (formList) {
      setAboutRepo(formList);
    }
  }, [formList]);

  useEffect(() => {
    if (prevResponseData.current !== responseData && responseData) {
      prevResponseData.current = responseData;

      const editSections = JSON.parse(localStorage.getItem("edit-sections-list") || "[]");
      const selectSections = JSON.parse(localStorage.getItem("select-sections-list") || "[]");

      const newSectionId = editSections.length + selectSections.length + 1;
      const newSection = {
        id: newSectionId,
        title: "자동생성RM",
        markdown: responseData,
      };

      localStorage.setItem("edit-sections-list", JSON.stringify([newSection, ...editSections]));

      localStorage.setItem("current-section", JSON.stringify(newSection));
      setTab("Builder");
    }
  }, [responseData]);

  const getRepos = async (username: string, token: string) => {
    if (!githubRepo.length || !openAiToken) {
      alert("Please enter the GitHub repository address and OpenAI key.");
      return;
    }

    setIsLoading(true);
    try {
      const member = await axios.get(`https://api.github.com/repos/${githubRepo.slice(-2).join("/")}/contributors`, {
        headers: { Authorization: `token ${githubApiToken}` },
      });
      setMemberList(member?.data.map(ele => ele.login).join());

      const response = await axios.get(`https://api.github.com/repos/${githubRepo.slice(-2).join("/")}`, {
        headers: { Authorization: `token ${githubApiToken}` },
      });

      if (response.data) {
        const aiResponse = await createReadme(
          response.data,
          member?.data.map(ele => ele.login).join(),
          member?.data.map(ele => ele.avatar_url).join(),
        );
        console.log("aiResponse", aiResponse);
        setResponseData(aiResponse.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error("Error fetching repository:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function createReadme(data, member, avatar_url) {
    const openai = new OpenAI({
      apiKey: openAiToken,
      dangerouslyAllowBrowser: true,
    });

    const prompt = `
    레포지토리의 이름: ${data.name}
    레포지토리의 전체 이름: ${data.full_name}
    레포지토리 소유자: ${data.owner.login}
    레포지토리의 설명: ${data.description}
    레포지토리의 기본 브랜치: ${data.default_branch}
    레포지토리의 프로그래밍 언어: ${data.language}
    레포지토리 URL: ${data.html_url}
    레포지토리 생성일: ${data.created_at}
    레포지토리 최종 업데이트: ${data.updated_at}
    레포지토리가 포크된 여부: ${data.fork ? "예" : "아니오"}
    레포지토리의 포크 수: ${data.forks_count}
    레포지토리의 스타 수: ${data.stargazers_count}
    레포지토리의 감시자 수: ${data.watchers_count}
    레포지토리의 이슈 수: ${data.open_issues_count}
    레포지토리의 라이선스: ${data.license ? data.license.name : "없음"}
    레포지토리의 크기: ${data.size} KB
    레포지토리의 접근 가능 여부: ${data.private ? "비공개" : "공개"}
    레포지토리의 위키 사용 가능 여부: ${data.has_wiki ? "사용" : "사용 안 함"}
    레포지토리의 페이지 사용 여부: ${data.has_pages ? "사용" : "사용 안 함"}
    사용한 기술 스택: ${techStackList}
    사용한 패키지 매니저: ${packageManagerList}
    프로젝트에 대한 설명: ${descriptionList}
    ${aboutRepo.map(item => `${item.title}: ${item.value}`).join("\n")}

    위의 값들은 github API를 이용해서 레포지토리의 정보를 가져온 것이고, 아래는 README 파일을 생성하는데 사용될 예시 템플릿입니다. 위의 정보들을 사용해 아래 각각의 섹션들에 해당하는 내용을 추가해서 README를 작성해주세요. 
    추가적으로 생략되는 섹션이 없도록 해주세요.
    "" 안에 들어있는 내용들을 각각의 섹션에 들어가야 할 내용을 설명해 놓은 것입니다.
    ''안에 들어있는 내용은 예시입니다. 만약 해당 섹션에 추가할 내용을 가져올 수 없는 경우에는 예시와 똑같이 작성하지 말고 "직접 입력해주세요" 라는 문구를 넣어주세요.

    "아래 이미지는 무조건 추가해줘"
    
    ![프로젝트-로고나 메인화면-입력해주세요](https://github.com/Readme-Monster/readme-monster/assets/88364280/96e680e5-613f-4818-8603-8afbb0c9acb1)
    
    "최근 커밋이나 업데이트에 해당하는 값을 아래와 같은 형식으로 가져와서 넣어주세요."

    [![Commit Activity](https://img.shields.io/github/commit-activity/m/${githubRepo.slice(-2).join("/")})](https://github.com/${githubRepo.slice(-2).join("/")}/pulse)

    # 레포지토리 이름

    "레포지토리에 대한 간략한 설명이 들어가는 위치입니다. 위의 프로젝트에 대한 설명 데이터를 이용해 작성해주세요. 해당하는 내용을 찾을 수 없는 경우 '직접 작성해주세요'라고 작성해주세요."

    'Readme Monster는 GitHub 레포지토리의 Readme 파일을 자동으로 생성해주는 서비스입니다.'

    ## 링크

    "레포지토리에 관련된 링크들이 들어갈 위치입니다."

    '- [서비스 바로가기](배포되어있는 링크가 들어갈 위치)'
    '- [디자인](디자인 관련 링크가 들어갈 위치)'
    '- [Wiki](위키 링크가 들어갈 위치)'

    ## 기술 스택

    "해당 레포지토리에서 사용된 기술 스택들이 들어갈 위치입니다. 위에서 가져온 정보중에 사용한 기술 스택에 해당하는 내용을 참고해서 작성해주세요"
    "아래의 배지는 예시로 사용된 것이니, 직접 사용하실 때에는 해당 기술 스택에 맞는 배지를 사용해주세요."
    
    '![Badge](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)'

    ## 설치 방법

    "해당 프로젝트를 로컬 환경에서 실행시키기 위해 실행해야하는 명령어들이 들어갈 위치"
    "아래의 예시는 yarn을 사용하는 경우입니다. 위에서 주어진 사용하는 패키지 매니저 값에 따라서 해당하는 패키지 매니저를 사용하는 방법을 추가해주세요."

    'yarn install'

    ## 팀원을 소개합니다

    "팀원들의 GitHub 프로필 링크가 들어갈 위치입니다. 이 프로젝트의 팀원들의 이름은 ${member} 이고 각각 팀원들의 avatars는 ${avatar_url} 입니다. 참고해서 팀원들의 프로필 링크를 추가해주세요.
    팀원은 ${member} 중에 최대 8명까지만 추가할 수 있습니다. 8명을 초과하는 경우 8명까지만 추가해주세요.
    아래의 템플릿을 참고하여 작성해주세요.
    해당하는 팀원을 찾을 수 없는 경우 예시와 똑같이 작성하지 말고 알파벳순으로 임의로 작성해주세요."

    
    '|[![](https://avatars.githubusercontent.com/u/팀원1 avatar_url)](https://github.com/팀원1)|[![](https://avatars.githubusercontent.com/u/팀원2 avatar_url)](https://github.com/팀원2)|[![](https://avatars.githubusercontent.com/u/팀원3 avatar_url)](https://github.com/팀원3)|[![](https://avatars.githubusercontent.com/u/팀원4 avatar_url)](https://github.com/팀원4)|'
    '|:---:|:---:|:---:|:---:|'
    '| 팀원1 이름 | 팀원2 이름 | 팀원3 이름 | 팀원4 이름 |'

    ## 코드 기여자

   " 코드 기여자들의 GitHub 프로필 링크가 들어갈 위치입니다. 코드 기여자들의 프로필 링크를 추가해주세요."
    `;

    console.log("prompt", prompt);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
          {
            role: "system",
            content:
              "너의 역할은 user가 넘겨주는 정보와 예시로 주어진 템플릿에 맞게 해당 레포지토리에 대한 Readme 파일을 작성해주는 것입니다.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 6000,
      });
      return response;
    } catch (error) {
      console.error("Error generating README:", error);
      throw new Error("Failed to generate README");
    }
  }

  console.log("memberList", memberList);
  return (
    <>
      {isLoading ? (
        <div className="w-1/2 flex justify-center items-center">
          <LoadingSpinner />
        </div> // 스피너 표시
      ) : (
        <button onClick={getRepos} className="w-1/2 rounded-[8px] bg-textBlue text-white hover:bg-[#6E9EFF]">
          Create README
        </button>
      )}
    </>
  );
};

export default AiGenerator;
