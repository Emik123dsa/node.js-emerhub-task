import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    id: { type: String, required: true },
    owner: { type: String, required: true },
    model_bike: { type: String, required: true },
    serial_number: { type: String, required: true },
    name_bike: { type: String, required: true },
    asap: { type: String, required: false },
    status: { type: String, required: false },
    created_at: { type: Date, required: true },
    modified_at: { type: Date, required: false },
  },
  { collection: "eh_stolen_bikes" }
);

module.exports = model("StolenBikes", schema);
