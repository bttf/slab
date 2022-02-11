import fs from "fs";
import path from "path";
import { Model, ModelDefined, ModelStatic, Sequelize } from "sequelize";

const {
  NODE_ENV,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
  PGCERT,
} = process.env;

if (!PGDATABASE || !PGUSER || !PGPORT) {
  throw new Error(
    "Environment variables PGDATABASE, PGUSER, PGPORT need to be set"
  );
}

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: parseInt(PGPORT, 10),
  dialect: "postgres",
  dialectOptions:
    NODE_ENV === "production"
      ? {
          ssl: {
            ca: PGCERT,
          },
        }
      : undefined,
});

class ExtendedModel extends Model {
  static initialize: (sequelize: Sequelize) => void;
  static associate: (sequelize: Sequelize) => void;
}

const db: { [modalName: string]: ModelStatic<ExtendedModel> } = {};
const modelsPath = path.join(__dirname, "models");

const init = async () => {
  await Promise.all(
    fs
      .readdirSync(modelsPath)
      .filter((filename) => filename.indexOf(".") !== 0)
      .map(async (filename) => {
        const model: ModelStatic<ExtendedModel> = await import(
          path.join(modelsPath, filename)
        );
        db[model.name] = model;
      })
  );

  Object.keys(db).forEach((modelName) => {
    const model = db[modelName];
    // TODO Figure this out
    if (typeof model.initialize === "function") {
    }
    if (typeof model.associations === "function") {
    }
  });
};
