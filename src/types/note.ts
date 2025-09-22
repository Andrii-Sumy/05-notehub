export type Tag = "Todo" | "Personal" | "Work" | "Shopping";

export interface Note {
  id: string;
  title: string;
  body: string;
  tag: Tag;
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
}
