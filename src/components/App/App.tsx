import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";

import {
  fetchNotes,
  createNote,
  deleteNote,
  type FetchNotesResponse,
  type CreateNotePayload,
} from "../../services/noteService";

import type { Note } from "../../types/note";

const PER_PAGE = 12;

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isOpen, setIsOpen] = useState(false);

  const qc = useQueryClient();

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearch, page, PER_PAGE] as const,
    queryFn: async (): Promise<FetchNotesResponse> =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch || undefined,
      }),
    placeholderData: (prev) => prev,
  });

const items: Note[] = data?.notes ?? [];
const totalPages = data?.totalPages ?? 0;


  const createMutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      setIsOpen(false);
      qc.invalidateQueries({ queryKey: ["notes"] });
      setPage(1);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleDelete = (id: string) => deleteMutation.mutate(id);
  const handleCreate = (values: CreateNotePayload) =>
    createMutation.mutate(values);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            forcePage={page - 1}
            onPageChange={(p) => setPage(p)}
          />
        )}

        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {items.length > 0 && <NoteList notes={items} onDelete={handleDelete} />}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm
            onCancel={() => setIsOpen(false)}
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
          />
        </Modal>
      )}

      {isFetching && <p style={{ padding: 16 }}>Loading…</p>}
      {isError && (
        <p style={{ padding: 16, color: "#fca5a5" }}>
          {(error as Error).message}
        </p>
      )}
      {!isFetching && !isError && items.length === 0 && (
        <p style={{ padding: 16 }}>No notes yet.</p>
      )}
    </div>
  );
}
