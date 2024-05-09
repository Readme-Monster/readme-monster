export interface SectionsType {
  id: number;
  title: string | undefined;
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
  formList: { title: string }[];
}
