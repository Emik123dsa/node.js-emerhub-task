import db from "./Config";

const { VENDOR_CONNECTION } = db;

import mongoose from "mongoose";

const baseURL = `mongodb+srv://${VENDOR_CONNECTION.db_user}:${VENDOR_CONNECTION.db_password}@cluster0-o72en.mongodb.net/${VENDOR_CONNECTION.db_name}?retryWrites=true&w=majority`;

async function start() {
  try {
    mongoose.connect(baseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

export default start;
