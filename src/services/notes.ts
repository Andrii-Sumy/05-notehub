import type { Note } from "../types/note";
import { v4 as uuid } from "uuid";

export function createNote(title: string, body: string): Note {
  const now = new Date().toISOString();
  return { id: uuid(), title, body, createdAt: now, updatedAt: now };
}
