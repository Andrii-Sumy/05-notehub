export type Tag = "Todo" | "Personal" | "Work" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
  userId?: string;
}
