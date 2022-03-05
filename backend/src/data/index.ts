import User from "./models/User";
import GoogleAuth from "./models/GoogleAuth";
import initDb, { sequelize } from "./initDb";

initDb();

export default {
  sequelize,
  User,
  GoogleAuth,
};
