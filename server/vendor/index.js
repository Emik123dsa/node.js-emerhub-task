import db from "./Config";

const { VENDOR_CONNECTION } = db;

import mongoose from "mongoose";

/*******************
 * SINGLETON *******
 * CONNECTION ******
 * TO MONGODB ******
 * @class Database *
 *******************/
class Database {
  static #protectedInstance = null;

  #baseURL = "";

  #db = null;
  /***********************************
   * CREATES AN INSTANCE OF DATABASE *
   * *********************************
   * @memberof Database
   */
  constructor() {
    if (!this.#baseURL) {
      this.#baseURL = `mongodb+srv://${VENDOR_CONNECTION.db_user}:${VENDOR_CONNECTION.db_password}@cluster0-o72en.mongodb.net/${VENDOR_CONNECTION.db_name}?retryWrites=true&w=majority`;
    }
    if (!Database.#protectedInstance) {
      Database.#protectedInstance = this;
    } else {
      return Database.#protectedInstance;
    }
  }
  /******************************
   * CONNECTION TO THE DATABASE *
   * ****************************
   * @memberof Database
   */
  initDB = async () => {
    try {
      return (this.#db = mongoose.connect(this.#baseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }));
    } catch (e) {
      console.error(e);
      process.exit();
    }
  };
  /************************************
   * CLOSE TO THE DATABASE CONNECTION *
   * **********************************
   * @memberof Database
   */
  closeDB = () => {
    return (this.#db = null);
  };
  /**
   *
   * EMPTY METHOD YET
   * @memberof Database
   */
  getDB = async () => {};
}

export default Database;
