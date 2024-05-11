/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import OpenAI from "openai";
import LoadingSpinner from "components/Common/LoadingSpinner/LoadingSpinner";
import { useTab } from "context/TabContext";

const AiGenerator = ({ githubAddress, openAiKey, formList }: GenerateKeyType) => {
  const githubApiToken = process.env.REACT_APP_GITHUB_API_KEY;
  const [repos, setRepos] = useState({});
  const [githubRepo, setGithubRepo] = useState([]);
  const [openAiToken, setOpenAiToken] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutRepo, setAboutRepo] = useState([]);
  const prevResponseData = useRef();
  const { setTab } = useTab();

  useEffect(() => {
    if (githubAddress) {
      setGithubRepo(githubAddress.split("/"));
    }
    if (openAiKey) {
      setOpenAiToken(openAiKey);
    }
  }, [githubAddress, openAiKey]);

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
      const response = await axios.get(`https://api.github.com/repos/${githubRepo.slice(-2).join("/")}`, {
        headers: { Authorization: `token ${githubApiToken}` },
      });

      if (response.data) {
        const aiResponse = await createReadme(response.data);
        console.log("aiResponse", aiResponse);
        setResponseData(aiResponse.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error("Error fetching repository:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function createReadme(data) {
    const openai = new OpenAI({
      apiKey: openAiToken,
      dangerouslyAllowBrowser: true,
    });

    const prompt = `
    ${data} 를 이용해서 prompt를 작성해주세요.
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
        max_tokens: 4000,
      });
      return response;
    } catch (error) {
      console.error("Error generating README:", error);
      throw new Error("Failed to generate README");
    }
  }

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
