"use client";
import css from "./NotePreview.module.css";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
// import NotePreviewModal from "@/components/NotePreviewModal/NotePreviewModal";
import Modal from "@/components/Modal/Modal";
export default function NotePreview() {
  const router = useRouter();

  const close = () => router.back();
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
  const formattedDate = format(new Date(note.createdAt), "MM/dd/yyyy, h:mm a", {
    locale: enUS,
  });
  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>Created date: {formattedDate} EDT</p>
          <span className={css.tag}>{note.tag}</span>
          <button className={css.backBtn} onClick={close}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
