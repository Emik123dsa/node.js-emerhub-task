import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    id: { type: String, required: true },
    owner: { type: String, required: true },
    address: { type: String, required: true },
    bikes: { type: Array, required: true },
    phone_number: { type: Number, required: true },
    passport_number: { type: String, required: true },
    email: { type: String, required: true },
    parent: { type: String, required: true },
    created_at: { type: String, required: false },
    modified_at: { type: String, required: false },
  },
  { collection: "eh_owners" }
);

module.exports = model("Owners", schema);
