import axios, { AxiosResponse } from "axios";
import type { Note } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN as string;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}


export interface FetchNotesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  notes: Note[];
}

export type CreateNotePayload = Pick<Note, "title" | "content" | "tag">;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = "" } = params;
  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: { page, perPage, search },
  });
  return res.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post("/notes", payload);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
}
