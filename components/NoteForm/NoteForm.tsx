import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { addNote } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteAddData } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
}

interface NotesFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .required("Name is required"),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("You need to choose one option"),
});

const initialValues: NotesFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};
export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (noteData: NewNoteAddData) => addNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });
  const handleSubmit = (
    values: NotesFormValues,
    { resetForm }: FormikHelpers<NotesFormValues>
  ) => {
    mutate(values);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={OrderFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            {isPending ? "Creating new note..." : "Create new note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
