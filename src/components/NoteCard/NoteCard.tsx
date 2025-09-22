import css from "./NoteCard.module.css";
import type { Note } from "../../types/note";

export interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <article className={css.card}>
      <h3 className={css.title}>{note.title || "(no title)"}</h3>
      <p className={css.text}>{note.body}</p>

      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <button className={css.del} onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
