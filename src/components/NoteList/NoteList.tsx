import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import NoteCard from "../NoteCard/NoteCard";

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) return null;
  return (
    <ul className={css.grid}>
      {notes.map((n) => (
        <li key={n.id}>
          <NoteCard note={n} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
