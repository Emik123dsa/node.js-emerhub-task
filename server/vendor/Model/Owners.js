import { Schema, model } from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema(
  {
    id: { type: String, required: true },
    owner: { type: String, required: true },
    address: { type: String, required: true },
    bikes: { type: Array, required: true },
    phone_number: { type: Number, required: true, unique: true },
    passport_number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    parent: { type: String, required: true },
    created_at: { type: Date, required: false },
    modified_at: { type: Date, required: false },
  },
  { collection: "eh_owners" }
);

schema.plugin(uniqueValidator, { type: "owner-validator" });

module.exports = model("Owners", schema);
