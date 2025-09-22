import css from "./SearchBox.module.css";

export interface SearchBoxProps {
  value: string;
  onChange: (q: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className={css.wrap}>
      <input
        className={css.input}
        type="search"
        placeholder="Search notes…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
