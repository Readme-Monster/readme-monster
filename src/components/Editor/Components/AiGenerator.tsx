/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import OpenAI from "openai";

const AiGenerator = ({ githubAddress, openAiKey, formList }: GenerateKeyType) => {
  console.log("githubAddress", githubAddress);
  console.log("openAiKey", openAiKey);
  const githubApiToken = process.env.REACT_APP_GITHUB_API_KEY;
  const [repos, setRepos] = useState({});
  // const [response, setResponse] = useState("");
  const [githubRepo, setGithubRepo] = useState([]);
  const [openAiToken, setOpenAiToken] = useState("");
  const [aboutRepo, setAboutRepo] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [responseData, setResponseData] = useState(null); // API 응답 데이터 저장

  useEffect(() => {
    if (githubAddress) {
      setGithubRepo(githubAddress.split("/"));
    }
  }, [githubAddress]);

  useEffect(() => {
    if (openAiKey) {
      setOpenAiToken(openAiKey);
    }
  }, [openAiKey]);

  useEffect(() => {
    if (formList) {
      setAboutRepo(formList);
    }
  }, [formList]);

  useEffect(() => {
    const editSectionsList = JSON.parse(localStorage.getItem("edit-sections-list"));
    if (!editSectionsList) {
      localStorage.setItem(
        "edit-sections-list",
        JSON.stringify([editSectionsList, { id: 10, title: "자동생성RM", markdown: responseData }]),
      );
      localStorage.setItem(
        "builder-sections-list",
        JSON.stringify([editSectionsList, { id: 10, title: "자동생성RM", markdown: responseData }]),
      );
    } else {
      localStorage.setItem(
        "edit-sections-list",
        JSON.stringify([{ id: 10, title: "자동생성RM", markdown: responseData }]),
      );
      localStorage.setItem(
        "builder-sections-list",
        JSON.stringify([{ id: 10, title: "자동생성RM", markdown: responseData }]),
      );
    }
  }, [responseData]);

  // openAiKey={openAiKey} githubAddress={githubAddress}
  const getRepos = async (username: string, token: string) => {
    if (!githubRepo.length || !openAiToken) {
      if (!githubRepo.length) {
        console.log("githubRepo", githubRepo);
        return alert("GitHub repository 주소를 입력해주세요");
      } else if (!openAiToken) {
        console.log("openAiToken", openAiToken);
        return alert("OpenAi key를 입력해주세요");
      }
    }
    try {
      const response = await axios.get(`https://api.github.com/repos/${githubRepo.slice(-2).join("/")}`, {
        headers: { Authorization: `token ${githubApiToken}` },
      });
      console.log("responseresponse", response.data);
      setRepos(response.data);
      if (response) {
        console.log(Object.keys(response.data).length);
        if (Object.keys(response.data).length) {
          console.log("여기여기", response.data);
          const aiResponse = await createReadme(response.data);
          console.log("aiResponse", aiResponse);
          setResponseData(aiResponse.choices[0].text.trim());
          // return response.data;
        }
      }
    } catch (error) {
      console.error("Error fetching repos:", error);
      return null;
    }
  };

  async function createReadme({
    name,
    description,
    language,
    stargazers_count,
    watchers_count,
    forks_count,
    open_issues_count,
    contributors,
    html_url,
    has_wiki,
    created_at,
    updated_at,
  }): Promise<string> {
    const openai = new OpenAI({
      // apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      apiKey: openAiToken,
      dangerouslyAllowBrowser: true,
    });

    console.log(name, description, language, contributors, html_url);

    // prompt 관련 내용
    const prompt = `GitHub 프로젝트를 위한 README 파일을 작성하세요. 다음은 프로젝트 상세 정보입니다:
프로젝트 이름: ${name}
설명: ${description}
주요 사용 언어: ${language}
별표 수: ${stargazers_count}
감시자 수: ${watchers_count}
포크 수: ${forks_count}
열린 이슈 수: ${open_issues_count}
프로젝트 URL: ${html_url}
주요 기능: 레포지토리를 분석해서 주요 기능을 요약해 주세요.
위키: ${has_wiki}
라이선스: ['지정되지 않음']
생성일: ${created_at}
최근 업데이트: ${updated_at}
${aboutRepo.map(item => `${item.title}: ${item.value}`).join("\n")}

이 정보를 바탕으로 다음을 포함하는 간결하면서도 포괄적인 README를 작성해 주세요:
- 프로젝트 소개
- 프로젝트 사용 시 주요 기능 및 이점
- 프로젝트 설치 및 시작 방법
- 프로젝트 기여 방법
- '라이선스', '기여자', '감사의 말' 등 관련 있는 추가 섹션 정보`;

    // `${html_url}

    // 이 레포지토리를 설명하는 리드미를 작성할거야. 지금부터 설명하는 내용을 마크다운 문법으로 작성해줘.

    // 프로젝트 제목인 ${name}는 가장 큰 h1으로 맨 위에 써줘.
    // 제목에 어울리는 것 같은 이모지도 하나 추천해서 제목 왼쪽에 넣어주면 좋겠어.

    // 그 다음으로는 h3(###)로 "프로젝트 개요"라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
    // 그리고 다음에 오는 텍스트를 그대로 넣어줘. unordered list를 사용해서 넣으면 돼.
    // ${description}

    // 다음으로는 h3(###)로 "기술 스택"이라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.

    // ${language}를 각각 https://simpleicons.org/ 사이트에서 검색하여 검색 결과를 바탕으로 다음 코드를 채워서 이어 써주면 돼. 줄바꿈 없이 붙여서 써줘야해.

    // ![Badge](https://img.shields.io/badge/로고이름-색상코드?style=flat&logo=로고이름&logoColor=white)
    // 로고 이름에는 검색 결과에서 가장 첫번째로 찾은 텍스트를, 색상 코드에서는 검색 결과에 나온 #로 시작하는 컬러 헥사코드 6자리를 #을 제외하고 넣어줘.

    // 그 다음으로는 h3(###)로 "참여 팀원"이라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
    // 그리고 아래 오는 내용을 표로 만들어주면 좋겠어.
    // 1번째 행에 각각의 팀원 이름을 넣어줘.
    // 2번째 행에는 각 팀원이 맡은 기능을 쓸거야.

    // 팀원 이름과 각 팀원이 맡은 기능은 다음과 같아.
    // ${contributors}`;

    // `
    // Please create the README for GitHub in Korean.. This repository named ${name} and description is ${description}. The main language used is ${language}. The Contributors are ${contributors}. For the rest of the information, refer to the repo link ${html_url}, summarize it, and add it yourself to the readme file.`;

    console.log("openai", openai);
    console.log("prompt", prompt);
    setIsLoading(true); // 로딩 시작
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 100,
      });
      console.log(response);
      // setResponseData(response); // 응답 데이터 저장
      // setResponseData(response.choices[0].text.trim()); // 실제 사용 시 구체적 데이터 처리
      return response;
    } catch (error) {
      console.log("Error generating README:", error);
      throw new Error("Failed to generate README");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }

  console.log("open api 에서 넘겨주는 응답", responseData);
  console.log("repos", repos);
  console.log("aboutRepo", aboutRepo);
  return (
    <button onClick={getRepos} className="w-1/2 rounded-[8px] bg-textBlue text-white hover:bg-[#6E9EFF]">
      Create
    </button>
  );
};

export default AiGenerator;
