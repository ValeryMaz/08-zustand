import axios from "axios";
import type { Note, NewNoteAddData } from "../types/note";

export interface NoteType {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search: string,
  tag: string
): Promise<NoteType> {
  // if (search.trim()) {
  //   params.search = query.trim();
  // }

  const response = await axios.get<NoteType>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        page,
        perPage,
        ...(search.trim() && { search: search.trim() }),
        ...(tag && { tag }),
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  // console.log(response.data);
  return response.data;
}

export async function addNote(noteData: NewNoteAddData): Promise<Note> {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

// export async function fetchNotesByCategory(tag: string): Promise<NoteType> {
//   const response = await axios.get<NoteType>(
//     "https://notehub-public.goit.study/api/notes",
//     {
//       params: {
//         tag,
//       },
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//       },
//     }
//   );
//   return response.data;
// }
