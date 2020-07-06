import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema(
  {
    id: { type: String, required: true },
    model_bike: { type: String, required: true },
    serial_number: { type: String, required: true, unique: true },
    name_bike: { type: String, required: true },
    asap: { type: Boolean, required: false },
    status: { type: String, required: false },
    created_at: { type: Date, required: true },
    modified_at: { type: Date, required: false },
  },
  { collection: "eh_stolen_bikes" }
);

schema.plugin(uniqueValidator, { type: "stolen-bikes-validator" });

module.exports = model("StolenBikes", schema);
