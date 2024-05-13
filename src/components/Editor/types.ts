export interface SectionsType {
  id: number;
  name: string;
  title: string;
  markdown: string | undefined;
}
export interface ValueType {
  value: string | undefined;
}

export interface KeyType {
  type: string;
}

export interface GenerateKeyType {
  githubAddress: string[];
  openAiKey: string;
  techStack: string;
  packageManager: string;
  description: string;
  formList: { title: string }[];
}

export interface FirebaseStore {
  id: string;
  sections: {
    id: number;
    editSections: SectionsType[];
    selectSections: SectionsType[];
  }[];
}
