import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./create.module.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Note ",
  description:
    "Add a new note with a title, text, and a category. Quickly create a new note by adding a title, text, and selecting a category to keep your ideas organized.",
  openGraph: {
    title: `Create New Note | Minimal Notes`,
    description:
      "Quickly create a new note by adding a title, text, and selecting a category to keep your ideas organized.".slice(
        0,
        100
      ),
    url: "https://notehub.com/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub photo",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
