import css from "./Header.module.css";
export default function Header(){
  return (
    <header className={css.header}>
      <h1 className={css.title}>NoteHub</h1>
    </header>
  );
}
