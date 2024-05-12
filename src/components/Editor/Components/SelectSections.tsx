import React, { useEffect, useRef, useState } from "react";
import { Add } from "@carbon/icons-react";
import SearchSection from "./SearchSection";
import SelectSection from "./SelectSection";
import AddSectionModal from "../Modal/AddSectionModal";
import { SectionsType } from "../types";
import { useSection } from "context/SectionContext";

const SelectSections = () => {
  const { state, actions } = useSection();
  const [sections, setSections] = useState<SectionsType[]>(() => {
    const localData = JSON.parse(localStorage.getItem("select-sections-list") || "[]");
    return localData.length > 0 ? localData : state.selectSections;
  });
  const [search, setSearch] = useState("");
  const [searchSection, setSerchSection] = useState<SectionsType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const sectionList = search.length > 0 ? searchSection : sections;

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };

  const openModalAlert = () => {
    setOpenModal(!openModal);
  };

  const onClickSection = (e: React.MouseEvent<HTMLElement, MouseEvent>, section: SectionsType) => {
    e.stopPropagation();
    setSections(prev => prev.filter(el => el.id !== section.id));
    actions.setSelectSections(prev => prev.filter(el => el.id !== section.id));
    actions.setEditSections(prev => [...prev, section]);
    actions.setEditorMarkDown(prev => ({ ...prev, ...section }));
    actions.setFocusSection(section.id);
  };

  useEffect(() => {
    if (sections.length > 0) {
      actions.setSelectSections(sections);
    }
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const searchSection = sections.filter(s => {
        return s.name.toLowerCase().includes(search.toLowerCase());
      });
      setSerchSection(searchSection);
    } else {
      setSections(state.selectSections);
    }
  }, [search]);

  useEffect(() => {
    setSearch("");
    setSections(state.selectSections);
  }, [state.selectSections]);

  useEffect(() => {
    localStorage.setItem("select-sections-list", JSON.stringify(sections));
  }, [sections]);

  return (
    <div className="h-full flex flex-col gap-[10px] px-[10px]">
      <div className="flex-Center flex-row justify-between min-h-[40px]">
        <p className="text-textPrimary ml-[5px] mb-0 text-sm dark:text-textWhite">Select Section</p>
        <Add size={30} className="fill-textBlue cursor-pointer" onClick={openModalAlert} />
      </div>
      <div className="h-full max-h-auto flex flex-col gap-[10px]">
        <SearchSection search={search} setSearch={setSearch} />
        {sectionList.map(section => (
          <SelectSection
            key={section.id}
            id={section.id}
            name={section.name}
            title={section.title}
            markdown={section.markdown}
            onClickSection={onClickSection}
          />
        ))}
      </div>
      {openModal && (
        <AddSectionModal
          modalRef={modalRef}
          modalOutSideClick={modalOutSideClick}
          onClose={openModalAlert}
          openModal={openModal}
        />
      )}
    </div>
  );
};

export default SelectSections;
