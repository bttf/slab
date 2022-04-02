import User from "./models/User";
import GoogleAuth from "./models/GoogleAuth";
import initDb from "./initDb";
import sequelize from "./sequelize";

initDb();

export default {
  sequelize,
  User,
  GoogleAuth,
};
