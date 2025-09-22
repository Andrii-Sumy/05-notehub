import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import type { Tag } from "../../types/note";

export interface NoteFormProps {
  onSubmit: (values: { title: string; body: string; tag: Tag }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const tags: Tag[] = ["Todo", "Personal", "Work", "Shopping"];

const schema = Yup.object({
  title: Yup.string().max(120, "Max 120 chars"),
  body: Yup.string().trim().min(1, "Please enter note text").required(),
  tag: Yup.mixed<Tag>().oneOf(tags).required(),
});

export default function NoteForm({ onSubmit, onCancel, isSubmitting }: NoteFormProps) {
  return (
    <Formik
      initialValues={{ title: "", body: "", tag: "Todo" as Tag }}
      validationSchema={schema}
      onSubmit={(values, helpers) => {
        onSubmit({
          title: values.title.trim(),
          body: values.body.trim(),
          tag: values.tag,
        });
        helpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting: formSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Title
            <Field name="title" className={css.input} placeholder="(optional)" />
            <FormikError name="title" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Content
            <Field
              as="textarea"
              name="body"
              rows={8}
              className={css.area}
              placeholder="Write a note…"
            />
            <FormikError name="body" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Tag
            <Field as="select" name="tag" className={css.select}>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <FormikError name="tag" component="div" className={css.error} />
          </label>

          <div className={css.actions}>
            <button
              type="button"
              className={css.secondary}
              onClick={onCancel}
              disabled={isSubmitting || formSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.primary}
              disabled={isSubmitting || formSubmitting}
            >
              {isSubmitting || formSubmitting ? "Saving…" : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
