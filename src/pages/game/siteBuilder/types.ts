export type BlockType =
  | "Header"
  | "Main"
  | "Footer"
  | "Hero"
  | "Section"
  | "Article"
  | "Sidebar";

export interface Block {
  id: string;
  type: BlockType;
  content: JSX.Element;
}
