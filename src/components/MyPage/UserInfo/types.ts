import { Timestamp } from "firebase/firestore";

export interface UserInfoProps {
  name: string;
  email: string;
  docId: string;
  image: string;
  sections: UserSectionList[];
}

export interface UserSectionList {
  id: number;
  editSections: SectionProps[];
  selectSections: SectionProps[];
  saveDate: Timestamp;
  dateType?: string;
}

export interface SectionProps {
  id: number;
  name: string;
  title: string;
  markdown: string;
}

export interface NewSectionList {
  dateType: string;
  data: UserSectionList[];
}
