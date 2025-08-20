"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import type { NoteType } from "../../../../lib/api";
import type { Note } from "../../../../types/note";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import css from "./Notes.module.css";
type initialProps = {
  initialData: NoteType;
  tag: string;
};

function NotesClient({ initialData, tag }: initialProps) {
  const [currentPage, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        {/* Компонент SearchBox */}
        <SearchBox value={searchText} onSearch={handleSearchText} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            total={totalPages}
            onChange={setPage}
            current={currentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>
      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error.message}</p>}
      {isSuccess && notes.length === 0 && <p>Нет заметок</p>}
      {isSuccess && notes?.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
