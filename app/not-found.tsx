import css from "./page.module.css";
import type { Metadata } from "next";

const errorDesc =
  "Sorry, the page you are looking for doesn't exist. Return to Minimal Notes - your digital notepad for organized note-taking.";

export const metadata: Metadata = {
  title: "Page not found | Minimal Notes",
  description: errorDesc,
  openGraph: {
    title: `Page not found | Minimal Notes`,
    description: errorDesc.slice(0, 100),
    url: "https://notehub.com/notes/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found | NoteHub photo",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
