export interface ValueType {
  value: string | undefined;
}

export interface SectionsType {
  id: number;
  title: string | undefined;
  markdown: string | undefined;
  onDeleteSection: (e: React.MouseEvent<HTMLElement, MouseEvent>, targetId: number) => void;
}

export interface KeyNameType {
  keyName: string;
}
