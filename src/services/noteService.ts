import axios from "axios";
import type { Note } from "../types/note";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export interface FetchNotesParams {
  page: number; perPage: number; search?: string;
}
export interface FetchNotesResponse {
  items: Note[]; page: number; perPage: number; totalItems: number; totalPages: number;
}

export async function fetchNotes({ page, perPage, search }: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data, headers } = await api.get<Note[]>("/notes", {
    params: { _page: page, _limit: perPage, q: search || undefined },
  });
  const totalItems = Number(headers["x-total-count"] || data.length || 0);
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  return { items: data, page, perPage, totalItems, totalPages };
}

export async function createNote(payload: Omit<Note, "id"|"createdAt"|"updatedAt">) {
  const now = new Date().toISOString();
  const { data } = await api.post<Note>("/notes", { ...payload, createdAt: now, updatedAt: now });
  return data;
}

export async function deleteNote(id: string) {
  await api.delete(`/notes/${id}`);
  return { success: true as const };
}
