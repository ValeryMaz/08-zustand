"use client";

import css from "./NoteForm.module.css";
import { addNote } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteAddData } from "../../types/note";
import { useRouter } from "next/navigation";
import { useDraftStore } from "@/lib/store/noteStore";
import { ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

interface NotesFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useDraftStore();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (noteData: NewNoteAddData) => addNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
    onError: (error) => {
      toast.error(`Failed to create note: ${error.message}`);
    },
  });
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteAddData;
    mutate(values);
  };
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    setDraft({
      ...(draft as NewNoteAddData),
      [event.target.name as keyof NewNoteAddData]: event.target.value,
    });
  };

  return (
    <>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className={css.input}
            onChange={handleChange}
            defaultValue={draft.title}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className={css.textarea}
            onChange={handleChange}
            defaultValue={draft.content}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            onChange={handleChange}
            required
            defaultValue={draft.tag}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            {isPending ? "Creating new note..." : "Create new note"}
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
}
