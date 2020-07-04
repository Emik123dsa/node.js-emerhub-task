import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    group: { type: String, required: true },
    parent: { type: String, required: true },
    created_at: { type: String, required: false },
    modified_at: { type: String, required: false },
  },
  { collection: "eh_owners" }
);

module.exports = model("Owners", schema);
