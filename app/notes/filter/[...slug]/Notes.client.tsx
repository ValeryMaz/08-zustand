"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, NoteType } from "../../../../lib/api";
import type { Note } from "../../../../types/note";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import { useState } from "react";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import css from "./Notes.module.css";
import Link from "next/link";

type initialProps = {
  initialData: NoteType;
  tag: string;
};

function NotesClient({ initialData, tag }: initialProps) {
  const [currentPage, setPage] = useState(1);
  const [searchText, setSearchText] = useState<string>("");

  const perPage = 9;
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const { data, isSuccess, isLoading, error } = useQuery<NoteType>({
    queryKey: ["notes", perPage, currentPage, debouncedSearchText, tag],
    queryFn: () => fetchNotes(currentPage, perPage, debouncedSearchText, tag),
    placeholderData: keepPreviousData,
    initialData,
  });

  const handleSearchText = (newNote: string) => {
    setPage(1);
    setSearchText(newNote);
  };
  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchText} onSearch={handleSearchText} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            total={totalPages}
            onChange={setPage}
            current={currentPage}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {isSuccess && notes.length === 0 && <p>Notes not found</p>}
      {isSuccess && notes?.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default NotesClient;
