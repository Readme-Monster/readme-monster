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
    if (prevResponseData.current !== responseData && responseData) {
      prevResponseData.current = responseData; // Update the ref with the new responseData

      const editSections = JSON.parse(localStorage.getItem("edit-sections-list") || "[]");
      const selectSections = JSON.parse(localStorage.getItem("select-sections-list") || "[]");

      const newSectionId = editSections.length + selectSections.length + 1; // Calculate the new ID
      const newSection = {
        id: newSectionId,
        title: "자동생성RM",
        markdown: responseData,
      };

      // Update edit-sections-list by adding the new section at the beginning
      localStorage.setItem("edit-sections-list", JSON.stringify([newSection, ...editSections]));

      // Optionally update current-section
      localStorage.setItem("current-section", JSON.stringify(newSection));
      setTab("Builder");
    }
  }, [responseData]);

  // openAiKey={openAiKey} githubAddress={githubAddress}
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
      setRepos(response.data);

      if (response.data) {
        const aiResponse = await createReadme(response.data);
        setResponseData(aiResponse.choices[0].text.trim());
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

    const prompt = `Generate a README for the repository at ${data.html_url}`;
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 3000,
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
