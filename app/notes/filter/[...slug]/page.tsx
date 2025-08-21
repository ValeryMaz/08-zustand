import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface fetchParams {
  params: Promise<{ slug: string[] }>;
}

// app/notes/[id]/page.tsx

export async function generateMetadata({ params }: fetchParams) {
  const { slug } = await params;
  const tagName = slug[0] === "All" ? "" : slug[0];
  let pageTitle: string; //"All Notes | Minimal Notes"
  let noteDesc: string; //`Browse notes in the ${tagName} category`

  switch (tagName) {
    case "Work":
      pageTitle = "Work";
      noteDesc =
        "Your organized hub for work-related notes, projects, and task lists. Boost your productivity and never miss a deadline";
      break;
    case "Personal":
      pageTitle = "Personal";
      noteDesc =
        "A private space for your personal thoughts, journal entries, and life ideas";
      break;
    case "Meeting":
      pageTitle = "Meeting";
      noteDesc =
        "Organize your meeting minutes, action items, and discussion points efficiently";
      break;
    case "Shopping":
      pageTitle = "Shopping";
      noteDesc =
        "Create and manage your shopping lists. Organize items by store or category";
      break;
    case "":
      pageTitle = "All notes";
      noteDesc =
        "View and manage all your notes in one place. Your complete digital notepad";
      break;
    default:
      pageTitle = `${tagName}`;
      noteDesc = "Browse notes in categories";
  }

  return {
    title: `Notes from category: ${pageTitle}`,
    description: noteDesc.slice(0, 30),
    openGraph: {
      title: `Note: ${pageTitle}`,
      description: noteDesc.slice(0, 100),
      url: `https://notehub.com/notes/filter/${tagName}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tagName}`,
        },
      ],
      type: "article",
    },
  };
}

export default async function NotesPage({ params }: fetchParams) {
  const { slug } = await params;
  const currentPage = 1;
  const perPage = 9;
  const debouncedSearchText = "";
  const tag = slug[0] === "All" ? "" : slug[0];
  const initialValues = await fetchNotes(
    currentPage,
    perPage,
    debouncedSearchText,
    tag
  );
  return (
    <>
      <NotesClient initialData={initialValues} tag={tag} />
    </>
  );
}
