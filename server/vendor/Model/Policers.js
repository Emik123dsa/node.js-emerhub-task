import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    id: { type: String, required: true },
    bearer: { type: String, required: true },
    served_bikes: { type: Array, required: true },
    email: { type: String, required: true },
    is_available: { type: Boolean, required: true },
    parent: { type: String, required: true },
    created_at: { type: String, required: false },
    modified_at: { type: String, required: false },
  },
  { collection: "eh_policers" }
);

module.exports = model("Policers", schema);
