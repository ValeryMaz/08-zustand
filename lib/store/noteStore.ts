import { create } from "zustand";
import type { NewNoteAddData } from "@/types/note";
import { persist } from "zustand/middleware";

interface NoteStore {
  draft: NewNoteAddData;
  setDraft: (NewDraft: NewNoteAddData) => void;
  clearDraft: () => void;
}
const initialDraft: NewNoteAddData = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useDraftStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (NewDraft: NewNoteAddData) => set({ draft: NewDraft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "draft",
      partialize: (state) => {
        return { draft: state.draft };
      },
    }
  )
);
