import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
  {
    note: { type: "string", required: true },
    reference: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const Note = models.Note || model("Note", NoteSchema);

export default Note;
