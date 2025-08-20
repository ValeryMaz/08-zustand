import { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

interface PropsLayout {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function NotesLayout({ children, sidebar }: PropsLayout) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
