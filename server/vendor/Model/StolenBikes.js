import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    id: { type: String, required: true },
    owner: { type: String, required: true },
    name: { type: String, required: true },
    asap: { type: String, required: true },
    status: { type: String, required: true },
    resolved: {type: Boolean, required: true },
    created_at: { type: String, required: false },
    modified_at: { type: String, required: false },
  },
  { collection: "eh_stolen_bikes" }
);

module.exports = model("StolenBikes", schema);
