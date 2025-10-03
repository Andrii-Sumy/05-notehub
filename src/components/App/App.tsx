import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";

import { fetchNotes, type FetchNotesResponse } from "../../services/noteService";
import type { Note } from "../../types/note";

const PER_PAGE = 12;

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearch, page, PER_PAGE] as const,
    queryFn: async (): Promise<FetchNotesResponse> =>
      fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch || undefined }),
    placeholderData: (prev) => prev,
  });

  const items: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

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

      {items.length > 0 && <NoteList notes={items} />}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onCancel={() => setIsOpen(false)} />
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
