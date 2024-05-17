/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import LoadingSpinner from "components/Common/LoadingSpinner/LoadingSpinner";
import { CallGPT } from "api/gpt";
import { useTab } from "context/TabContext";
import { useSection } from "context/SectionContext";
import { handleStreamResponse } from "utils/streamHandler";
import ResultContentsModal from "../Modal/ResultContentsModal";

const AiGenerator = ({
  githubAddress,
  openAiKey,
  formList,
  techStack,
  packageManager,
  description,
}: GenerateKeyType) => {
  const { state, actions } = useSection();
  const githubApiToken = process.env.REACT_APP_GITHUB_API_KEY;
  const [repos, setRepos] = useState({});
  const [githubRepo, setGithubRepo] = useState([]);
  const [openAiToken, setOpenAiToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aboutRepo, setAboutRepo] = useState([]);
  const [memberList, setMemberList] = useState("");
  const [techStackList, setTechStackList] = useState("");
  const [packageManagerList, setPackageManagerList] = useState("");
  const [descriptionList, setDescriptionList] = useState("");
  const [responseData, setResponseData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevResponseData = useRef<string | null>(null);
  const responseContainerRef = useRef<HTMLDivElement | null>(null);
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
  }, [githubAddress, openAiKey, techStack, packageManager, description]);

  useEffect(() => {
    if (formList) {
      setAboutRepo(formList);
    }
  }, [formList]);

  useEffect(() => {
    if (isModalOpen && responseContainerRef.current) {
      responseContainerRef.current.innerText = ""; // 초기화
    }
  }, [isModalOpen]);

  const getRepos = async () => {
    if (!githubRepo.length || !openAiToken) {
      alert("깃허브 레포지토리 주소와 OpenAI 키를 입력해주세요.");
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
        setIsModalOpen(true); // 모달 열기
        await createReadmeCall(
          response.data,
          member?.data.map(ele => ele.login).join(),
          member?.data.map(ele => ele.avatar_url).join(),
        );
        // setResponseData(aiResponse.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error("Error fetching repository:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //gpt 호출
  const createReadmeCall = async (data, member, avatar_url) => {
    const repoData = {
      data,
      member,
      avatar_url,
      techStackList,
      packageManagerList,
      descriptionList,
      aboutRepo,
      githubRepo,
      openAiKey,
    };

    setIsLoading(true);
    const stream = await CallGPT(repoData);

    await handleStreamResponse(stream, chunk => {
      if (responseContainerRef.current) {
        responseContainerRef.current.innerText += chunk;
      }
      setResponseData(prev => (prev ?? "") + chunk);
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (prevResponseData.current !== responseData && responseData) {
      prevResponseData.current = responseData;

      const newSectionId = state.editSections.length + state.selectSections.length + 1;
      const currentDateTime = dayjs().format("DD/MM/YY HH:mm");
      const newSection = {
        id: newSectionId,
        name: `RM ${currentDateTime}`,
        title: `RM ${currentDateTime}`,
        markdown: responseData,
      };

      actions.setEditSections(prev => [...prev, newSection]);
      actions.setEditorMarkDown(prev => ({ ...prev, ...newSection }));
      actions.setFocusSection(newSection.id);

      setTab("builder");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-1/2 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <button onClick={getRepos} className="w-1/2 rounded-[8px] bg-textBlue text-white hover:bg-[#6E9EFF]">
            생성하기
          </button>
        </>
      )}
      <ResultContentsModal isOpen={isModalOpen} onClose={handleCloseModal} ref={responseContainerRef} />
    </>
  );
};

export default AiGenerator;
