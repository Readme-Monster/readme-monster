/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import OpenAI from "openai";

const AiGenerator = () => {
  const githubToken = process.env.REACT_APP_GITHUB_API_KEY;
  const [repos, setRepos] = useState({});
  const [response, setResponse] = useState("");

  const getRepos = async (username: string, token: string) => {
    try {
      const response = await axios.get("https://api.github.com/repos/Readme-Monster/readme-monster", {
        headers: { Authorization: `token ${githubToken}` },
      });
      console.log("responseresponse", response.data);
      setRepos(response.data);
      if (response) {
        console.log(Object.keys(response.data).length);
        if (Object.keys(response.data).length) {
          console.log("여기여기");
          const aiResponse = await createReadme(response.data);
          console.log("aiResponse", aiResponse);
          setResponse(aiResponse.choices[0].text.trim());
          // return response.data;
        }
      }
    } catch (error) {
      console.error("Error fetching repos:", error);
      return null;
    }
  };

  async function createReadme({ name, description, language, contributors, html_url }): Promise<string> {
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    console.log(name, description, language, contributors, html_url);

    // prompt 관련 내용
    const prompt = `${html_url}
    
    이 레포지토리를 설명하는 리드미를 작성할거야. 지금부터 설명하는 내용을 마크다운 문법으로 작성해줘.
    
    프로젝트 제목인 ${name}는 가장 큰 h1으로 맨 위에 써줘.
    제목에 어울리는 것 같은 이모지도 하나 추천해서 제목 왼쪽에 넣어주면 좋겠어.
    
    그 다음으로는 h3(###)로 "프로젝트 개요"라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
    그리고 다음에 오는 텍스트를 그대로 넣어줘. unordered list를 사용해서 넣으면 돼.
    ${description}
    

    다음으로는 h3(###)로 "기술 스택"이라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
    
    ${language}를 각각 https://simpleicons.org/ 사이트에서 검색하여 검색 결과를 바탕으로 다음 코드를 채워서 이어 써주면 돼. 줄바꿈 없이 붙여서 써줘야해.
    
    ![Badge](https://img.shields.io/badge/로고이름-색상코드?style=flat&logo=로고이름&logoColor=white)
    로고 이름에는 검색 결과에서 가장 첫번째로 찾은 텍스트를, 색상 코드에서는 검색 결과에 나온 #로 시작하는 컬러 헥사코드 6자리를 #을 제외하고 넣어줘.
    
    
    그 다음으로는 h3(###)로 "참여 팀원"이라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
    그리고 아래 오는 내용을 표로 만들어주면 좋겠어.
    1번째 행에 각각의 팀원 이름을 넣어줘.
    2번째 행에는 각 팀원이 맡은 기능을 쓸거야.
    
    팀원 이름과 각 팀원이 맡은 기능은 다음과 같아.
    ${contributors}`;
    // `
    // Please create the README for GitHub in Korean.. This repository named ${name} and description is ${description}. The main language used is ${language}. The Contributors are ${contributors}. For the rest of the information, refer to the repo link ${html_url}, summarize it, and add it yourself to the readme file.`;

    console.log("openai", openai);
    try {
      const response = await openai.completions.create({
        // messages: [{ role: "user", content: `${prompt}` }],
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 150,
      });
      console.log(response);
      return response;

      // return response.data.choices[0].text.trim();
    } catch (error) {
      console.log("Error generating README:", error);
      throw new Error("Failed to generate README");
    }
  }

  console.log("open api 에서 넘겨주는 응답", response);
  console.log("repos", repos);
  return (
    <div className="border-3">
      <button onClick={getRepos}>readme생성</button>
    </div>
  );
};

export default AiGenerator;