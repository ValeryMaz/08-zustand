// import { string } from "yup";

export interface Note {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
  content: string;
}

export interface NewNoteAddData {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

// export interface initialValuesProps {
//   notes: Note[];
//   totalPages: number;
// }
