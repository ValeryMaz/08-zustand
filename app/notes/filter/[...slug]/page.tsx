import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface fetchParams {
  params: Promise<{ slug: string[] }>;
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
