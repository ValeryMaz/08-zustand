"use client";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Please wait</p>;
  if (error || !note) return <p>Some error..</p>;
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created date: {note.createdAt}</p>
      </div>
    </div>
  );
}
