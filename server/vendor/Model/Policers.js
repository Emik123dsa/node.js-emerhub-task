import { Schema, model } from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema(
  {
    id: { type: String, required: true },
    bearer: { type: String, required: true },
    served_bikes: { type: Array, required: true },
    email: { type: String, required: true, unique: true },
    history_bikes: { type: Array, required: true },
    is_available: { type: Boolean, required: true },
    parent: { type: String, required: true },
    created_at: { type: Date, required: false },
    modified_at: { type: Date, required: false },
  },
  { collection: "eh_policers" }
);

schema.plugin(uniqueValidator, { type: "police-validator" });

module.exports = model("Policers", schema);
